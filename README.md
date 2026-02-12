# DENSHALED

Modern Japanese tram LCD recreation inspired by FreedomTrain design workflows and real LCD animation references.

## Languages

- English: `README.md`
- 日本語: `README.ja.md`
- 简体中文: `README.zh-CN.md`

## Features

- Complex multi-zone tram display (destination bar, next/now/status panels, route strip, info pages)
- Auto travel phases: `走行中` -> `まもなく到着` -> `停車中`
- Station progression with route highlighting and page transitions
- Rolling multilingual text (Kanji / Hiragana / English)
- Timed stop announcements
  - `approach` phase: next-stop announcement
  - `arrived` phase: arrival announcement
- Audio playback modes in UI:
  - `自動（音声ファイル優先）` = use generated files, fallback to browser speech
  - `ブラウザ音声合成のみ`
  - `停止`

## Project Files

- `index.html`: display + control panel structure
- `styles.css`: visual system + animation definitions
- `script.js`: simulator state machine, timing, announcements, and playback
- `scripts/generate_stop_audio.py`: batch generation of per-stop TTS assets
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow

## Run Locally

```bash
python3 -m http.server 8000
```

Open: `http://localhost:8000`

## Generate Stop Audio (OpenAI Speech)

This project supports pre-generated stop audio files under `assets/audio/stops/`.

1. Set your API key:

```bash
export OPENAI_API_KEY="your_key_here"
```

2. Generate all lines:

```bash
python3 scripts/generate_stop_audio.py
```

3. (Optional) dry-run without API calls:

```bash
python3 scripts/generate_stop_audio.py --dry-run --line sakura
```

If no generated files are present, the simulator can still announce stops with browser speech synthesis in `ブラウザ音声合成のみ` mode.

Generated files are named like:

- `assets/audio/stops/sakura/SA13_approach.mp3`
- `assets/audio/stops/sakura/SA13_arrived.mp3`

## GitHub Pages Deploy

1. Push to `main`
2. Ensure Pages source is set to **GitHub Actions**
3. Verify workflow: `Deploy DENSHALED to GitHub Pages`
