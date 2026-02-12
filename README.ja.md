# DENSHALED

FreedomTrain の制作フローと実際の LCD 再現動画の表現を参考にした、日本のモダントラム向け LCD 表示再現プロジェクトです。

## 言語

- English: `README.md`
- 日本語: `README.ja.md`
- 简体中文: `README.zh-CN.md`

## 主な機能

- 複合表示レイアウト（行先バー / 次駅・現在駅・ステータス / 路線ストリップ / 情報ページ）
- 走行フェーズ自動遷移: `走行中` -> `まもなく到着` -> `停車中`
- 駅進行に連動した路線ハイライトとページ切替
- 多言語ロール表示（漢字 / ひらがな / 英語）
- 停車タイミングに合わせた音声案内
  - `approach` フェーズ: 次駅案内
  - `arrived` フェーズ: 到着案内
- UI で選べる音声モード
  - `自動（音声ファイル優先）` = 生成済み音声を優先し、無い場合はブラウザ音声合成にフォールバック
  - `ブラウザ音声合成のみ`
  - `停止`

## ファイル構成

- `index.html`: 表示画面と制御パネルの構造
- `styles.css`: ビジュアルスタイルとアニメーション定義
- `script.js`: シミュレータの状態管理、タイミング制御、案内表示、音声再生
- `scripts/generate_stop_audio.py`: 停車駅ごとの音声を一括生成するスクリプト
- `.github/workflows/deploy-pages.yml`: GitHub Pages デプロイ用ワークフロー

## ローカル実行

```bash
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` を開いてください。

## 停車音声の生成（OpenAI Speech）

生成音声は `assets/audio/stops/` 配下に保存されます。

1. API キーを設定

```bash
export OPENAI_API_KEY="your_key_here"
```

2. 全路線の音声を生成

```bash
python3 scripts/generate_stop_audio.py
```

3. （任意）API を使わないドライラン

```bash
python3 scripts/generate_stop_audio.py --dry-run --line sakura
```

生成済みファイルが無い場合でも、`ブラウザ音声合成のみ` モードで案内音声を再生できます。

生成ファイル例:

- `assets/audio/stops/sakura/SA13_approach.mp3`
- `assets/audio/stops/sakura/SA13_arrived.mp3`

## GitHub Pages デプロイ

1. `main` に push
2. GitHub Pages のソースを **GitHub Actions** に設定
3. `Deploy DENSHALED to GitHub Pages` ワークフロー成功を確認
