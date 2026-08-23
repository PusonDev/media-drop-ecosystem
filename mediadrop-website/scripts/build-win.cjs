const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");
const { spawnSync } = require("node:child_process");

try {
  const projectRoot = path.resolve(__dirname, "..");
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "mediadrop-website-"));
  const tempProject = path.join(tempRoot, "site");

  fs.cpSync(projectRoot, tempProject, {
    recursive: true,
    filter: (source) => {
      const base = path.basename(source);
      return base !== "node_modules" && base !== ".next" && base !== "dist";
    },
  });

  const install = spawnSync("npm", ["ci", "--no-audit", "--no-fund"], {
    cwd: tempProject,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  if (install.error || install.status !== 0) {
    console.error(install.error || "Temporary dependency installation failed.");
    process.exit(1);
  }

  const result = spawnSync("npm", ["run", "build"], {
    cwd: tempProject,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
    },
  });

  if (result.error) {
    console.error(result.error);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }

  const nextDir = path.join(tempProject, ".next");
  const targetDir = path.join(projectRoot, ".next");

  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.cpSync(nextDir, targetDir, { recursive: true });
} catch (error) {
  console.error(error);
  process.exit(1);
}
