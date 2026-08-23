import fs from "node:fs";

const readlinkPatchSymbol = Symbol.for("mediadrop.normalize-readlink-errors");

function normalizeReadlinkError(error) {
  if (error?.code === "EISDIR") {
    error.code = "EINVAL";
  }
  return error;
}

if (!globalThis[readlinkPatchSymbol]) {
  const originalReadlink = fs.readlink.bind(fs);
  const originalReadlinkSync = fs.readlinkSync.bind(fs);
  const originalPromisesReadlink = fs.promises.readlink.bind(fs.promises);

  fs.readlink = (readlinkPath, options, callback) => {
    if (typeof options === "function") {
      return originalReadlink(readlinkPath, (error, linkTarget) => {
        options(normalizeReadlinkError(error), linkTarget);
      });
    }

    return originalReadlink(readlinkPath, options, (error, linkTarget) => {
      callback(normalizeReadlinkError(error), linkTarget);
    });
  };

  fs.readlinkSync = (...readlinkArguments) => {
    try {
      return originalReadlinkSync(...readlinkArguments);
    } catch (error) {
      throw normalizeReadlinkError(error);
    }
  };

  fs.promises.readlink = async (...readlinkArguments) => {
    try {
      return await originalPromisesReadlink(...readlinkArguments);
    } catch (error) {
      throw normalizeReadlinkError(error);
    }
  };

  Object.defineProperty(globalThis, readlinkPatchSymbol, { value: true });
}

class NormalizeReadlinkErrorsPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("NormalizeReadlinkErrorsPlugin", (compilation) => {
      const inputFileSystem = compilation.inputFileSystem;
      if (!inputFileSystem?.readlink || inputFileSystem.__normalizesEisdirReadlink) return;

      const originalReadlink = inputFileSystem.readlink.bind(inputFileSystem);
      Object.defineProperty(inputFileSystem, "__normalizesEisdirReadlink", { value: true });

      inputFileSystem.readlink = (readlinkPath, callback) => {
        originalReadlink(readlinkPath, (error, linkTarget) => {
          callback(normalizeReadlinkError(error), linkTarget);
        });
      };
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    config.resolve.symlinks = false;
    if (!dev) config.cache = false;
    if (!dev) config.plugins.push(new NormalizeReadlinkErrorsPlugin());
    return config;
  },
};

export default nextConfig;
