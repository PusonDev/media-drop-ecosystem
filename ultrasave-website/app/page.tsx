import React from "react";

const steps = [
  {
    title: "Paste link",
    text: "Drop in a YouTube, TikTok, Instagram, Facebook, or other supported URL. The app auto-detects what it can fetch.",
  },
  {
    title: "Pick quality",
    text: "See the real available formats for that exact video. No fake options, no guessing, no clutter.",
  },
  {
    title: "Download",
    text: "Save locally on Windows or Android with progress, resume support, and automatic merge when required.",
  },
];

const stats = [
  { value: "1,000+", label: "Supported sites" },
  { value: "4K", label: "Video quality" },
  { value: "320kbps", label: "Audio quality" },
  { value: "0", label: "Server downloads" },
];

const highlights = [
  "Client-side only",
  "Recommended quality tag",
  "Clipboard auto-detect",
  "Windows EXE + Android APK",
];

const trustPoints = [
  "No fake quality options",
  "Real progress + ETA",
  "Fast local downloads",
  "Works on Windows + Android",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="pointer-events-none fixed inset-0 z-[-10] bg-[radial-gradient(circle_at_top_left,_rgba(108,99,255,0.22),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_rgba(5,5,8,1)_0%,_rgba(10,10,16,1)_100%)]" />
      <div className="pointer-events-none fixed inset-0 z-[-10] opacity-60 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:72px_72px]" />

      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/35 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl shadow-[0_0_40px_rgba(108,99,255,0.25)]">
              🎬
            </span>
            <div>
              <div className="brand-wordmark text-white">Media Drop</div>
              <div className="text-xs uppercase tracking-[0.28em] text-slate-400">Download Anything. Keep Everything.</div>
            </div>
          </a>
          <div className="flex items-center gap-3 text-xs font-medium text-slate-400 sm:gap-5 sm:text-sm">
            <a href="#features" className="transition-colors hover:text-white">Features</a>
            <a href="#steps" className="transition-colors hover:text-white">How it works</a>
            <a href="#download" className="transition-colors hover:text-white">Download</a>
            <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
          </div>
          <a href="#download" className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(108,99,255,0.18)] transition hover:bg-white/10 sm:inline-flex">Get App</a>
        </div>
      </nav>

      <section className="relative px-6 pb-8 pt-24 md:pb-12 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.85)]" />
              Windows EXE + Android APK
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[0.96] tracking-tight text-white sm:text-5xl md:text-6xl">
              Save videos and audio
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
                without the clutter.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Media Drop keeps the flow simple: paste a link, preview the real available qualities,
              and save locally with clear progress. No server queue, no artificial limits, no fake options.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 px-7 py-4 text-base font-extrabold text-white shadow-[0_18px_60px_rgba(108,99,255,0.35)] transition hover:scale-[1.02]"
              >
                Download for Windows
              </a>
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-base font-extrabold text-white transition hover:bg-white/10"
              >
                Get Android APK
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(74,222,128,0.8)]" />
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                  <div className="text-2xl font-black tracking-tight text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="absolute -inset-10 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-xl">🎬</div>
                    <div>
                      <div className="brand-wordmark text-white">Media Drop</div>
                      <div className="text-xs text-slate-400">Preview experience</div>
                    </div>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Ready
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs uppercase tracking-[0.24em] text-slate-500">Paste link</div>
                    <div className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                      https://youtube.com/watch?v=...
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {["4K", "1080p", "720p", "Audio"].map((quality, index) => (
                      <div
                        key={quality}
                        className={`rounded-2xl border p-4 text-sm font-semibold transition ${
                          index === 1
                            ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
                            : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {quality}
                        {index === 1 ? <div className="mt-1 text-[11px] uppercase tracking-[0.24em] text-cyan-200">Recommended</div> : null}
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Downloading</span>
                      <span>67%</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-black/40">
                      <div className="h-2 w-[67%] rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500" />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>3.2 MB/s</span>
                      <span>ETA 00:12</span>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">Top quality</div>
                      <div className="mt-2 text-sm font-bold text-white">Recommended 1080p</div>
                      <div className="mt-1 text-xs text-slate-400">Best balance of size and quality</div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs uppercase tracking-[0.22em] text-slate-500">File type</div>
                      <div className="mt-2 text-sm font-bold text-white">MP4 + M4A</div>
                      <div className="mt-1 text-xs text-slate-400">Auto-merged on the device</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-6">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
            <span className="font-semibold text-white">Built for real use</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 md:inline-block" />
            <span>Real formats only</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 md:inline-block" />
            <span>Local downloads</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 md:inline-block" />
            <span>Friendly progress and ETA</span>
          </div>
        </div>
      </section>

      <section aria-label="Advertisement" className="px-6 pb-8">
        <div className="mx-auto flex min-h-[90px] max-w-7xl items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/20 text-xs uppercase tracking-[0.24em] text-slate-600">
          Ad space 728 x 90
        </div>
      </section>

      <section id="features" className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Features</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              Less clutter. More control.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">
              The interface should feel focused, not crowded. Everything important is visible without fighting the page.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["Real qualities", "Only show the formats that actually exist for that video.", "✓"],
              ["Thumbnail + title", "Let people confirm the content before they download.", "▣"],
              ["Progress with ETA", "No silent state. Always show speed, percent, and remaining time.", "↗"],
              ["Cross-platform", "One visual language for Windows, Android, and the landing site.", "⌘"],
            ].map(([title, text, icon]) => (
              <article key={title} className="rounded-[1.5rem] border border-white/15 bg-slate-900/75 p-6 shadow-lg transition hover:border-cyan-300/40 hover:bg-slate-800/90">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/25 bg-cyan-300/10 text-2xl font-bold text-cyan-200">{icon}</div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="formats" className="px-6 pb-12 md:pb-16">
        <div className="mx-auto max-w-7xl rounded-[1.5rem] border border-cyan-400/25 bg-slate-900/70 p-6 shadow-lg md:p-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Format control</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">Choose the file you actually want.</h2>
            <p className="mt-4 text-lg leading-8 text-slate-300">MediaDrop reads the exact formats available for each link, then lets you choose resolution, frame rate, or audio-only output.</p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Resolution", "4K, 1080p, 720p, 480p, 360p", "Only available heights appear."],
              ["Frame rate", "24, 30, 60 FPS", "Pick the frame rate exposed by the source."],
              ["Audio only", "M4A, MP3 320k, MP3 192k", "Save music and speech without video."],
            ].map(([title, value, detail]) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <h3 className="text-lg font-bold text-white">{title}</h3>
                <p className="mt-3 font-semibold text-cyan-200">{value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </section>

      <section id="steps" className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">How it works</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
                A simple 3-step flow.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400 md:text-right">
              Fast enough for casual users, clear enough for power users, and not overloaded with unnecessary controls.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-7">
                <div className="absolute right-5 top-5 text-6xl font-black text-white/5">{index + 1}</div>
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200">
                  Step {index + 1}
                </div>
                <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-7xl">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>
      </section>

      <section id="download" className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/18 via-white/5 to-transparent p-8 shadow-[0_24px_100px_rgba(108,99,255,0.16)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Windows</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white">EXE download</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              For Windows users who want a desktop app with bundled downloader engine, progress feedback, and local file saving.
            </p>
            <a
              href="https://github.com/PusonDev/media-drop-ecosystem/releases/download/v1.0.0/Media.Drop.Setup.1.0.0.exe"
              className="mt-7 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950 transition hover:scale-[1.01]"
            >
              Download Windows build
            </a>
            <div className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-400">
              Installer + portable package
            </div>
          </article>

          <article id="android-download-pending" className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Android</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-white">APK download</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
              For sideload installation on Android. Share links into the app, fetch the quality list, and save directly to the device.
            </p>
            <a
              href="#android-download-pending"
              className="mt-7 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-black/30 px-6 py-4 text-sm font-black text-white transition hover:bg-black/45"
            >
              Android APK coming soon
            </a>
            <div className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-400">
              Sideload ready
            </div>
          </article>
        </div>
      </section>

      <section aria-label="Affiliate links" className="px-6 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Recommended tools</p>
            <p className="mt-1 text-sm text-slate-400">Affiliate partner links can be placed here.</p>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-slate-600">Affiliate space reserved</div>
        </div>
      </section>

      <section id="faq" className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">FAQ</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
              Straight answers.
            </h2>
          </div>
          <div className="space-y-4">
            {[
              ["Is the website a downloader?", "No. The website is only for product info and distribution."],
              ["Do downloads happen on your server?", "No. All downloads happen on the user's device."],
              ["Does it show fake qualities?", "No. Only real, available qualities are shown."],
            ].map(([q, a]) => (
              <details key={q} className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-6 open:bg-white/[0.07]">
                <summary className="cursor-pointer list-none text-lg font-bold text-white">
                  {q}
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="brand-wordmark text-white">Media Drop</div>
            <p className="mt-2 max-w-xl text-sm leading-7 text-slate-400">
              A clean landing page for the Media Drop ecosystem. Built to look sharp, move fast, and keep the download flow obvious.
            </p>
          </div>
          <div className="grid gap-3 text-sm text-slate-500 md:text-right">
            <div>© 2026 Media Drop</div>
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/5 px-4 py-3">
              Ad / affiliate space reserved
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
