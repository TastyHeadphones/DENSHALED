# DENSHALED

这是一个面向日本现代有轨电车 LCD 显示的重现项目，参考了 FreedomTrain 的制作思路和真实 LCD 还原视频效果。

## 语言

- English: `README.md`
- 日本語: `README.ja.md`
- 简体中文: `README.zh-CN.md`

## 功能

- 复杂多区域显示布局（目的地栏 / 下一站与当前站 / 状态区 / 线路条 / 信息页）
- 自动运行阶段切换: `走行中` -> `まもなく到着` -> `停車中`
- 随站点推进的线路高亮与页面切换
- 多语言滚动显示（汉字 / 平假名 / 英文）
- 按停站时机触发语音播报
  - `approach` 阶段: 下一站播报
  - `arrived` 阶段: 到站播报
- UI 内可选语音模式
  - `自動（音声ファイル優先）` = 优先播放已生成音频，无文件时回退到浏览器语音合成
  - `ブラウザ音声合成のみ`
  - `停止`

## 项目文件

- `index.html`: 显示界面与控制面板结构
- `styles.css`: 视觉样式与动画定义
- `script.js`: 模拟器状态机、时序控制、播报与播放逻辑
- `scripts/generate_stop_audio.py`: 批量生成每站语音文件
- `.github/workflows/deploy-pages.yml`: GitHub Pages 部署工作流

## 本地运行

```bash
python3 -m http.server 8000
```

打开 `http://localhost:8000`。

## 生成停站语音（OpenAI Speech）

生成音频保存在 `assets/audio/stops/`。

1. 设置 API Key

```bash
export OPENAI_API_KEY="your_key_here"
```

2. 生成全部线路语音

```bash
python3 scripts/generate_stop_audio.py
```

3. （可选）不发起 API 请求的 dry-run

```bash
python3 scripts/generate_stop_audio.py --dry-run --line sakura
```

如果没有预生成音频文件，也可以使用 `ブラウザ音声合成のみ` 模式进行播报。

生成文件示例:

- `assets/audio/stops/sakura/SA13_approach.mp3`
- `assets/audio/stops/sakura/SA13_arrived.mp3`

## GitHub Pages 部署

1. 推送到 `main`
2. 在 Pages 设置中将来源设为 **GitHub Actions**
3. 确认 `Deploy DENSHALED to GitHub Pages` 工作流成功
