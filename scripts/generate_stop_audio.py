#!/usr/bin/env python3
"""Generate per-stop announcement audio files using the speech skill CLI.

Outputs files under assets/audio/stops/<line>/<station>_{approach|arrived}.mp3.
"""

from __future__ import annotations

import argparse
import json
import os
from pathlib import Path
import subprocess
import sys

DEFAULT_MODEL = "gpt-4o-mini-tts-2025-12-15"
DEFAULT_VOICE = "cedar"
DEFAULT_FORMAT = "mp3"
DEFAULT_RPM = 45

STOPS = {
    "sakura": [
        {"code": "SA01", "jp": "三ノ輪橋", "en": "Minowabashi"},
        {"code": "SA03", "jp": "荒川区役所前", "en": "Arakawa-kuyakushomae"},
        {"code": "SA07", "jp": "熊野前", "en": "Kumanomae"},
        {"code": "SA10", "jp": "宮ノ前", "en": "Miyanomae"},
        {"code": "SA13", "jp": "王子駅前", "en": "Oji-ekimae"},
        {"code": "SA16", "jp": "庚申塚", "en": "Koshinzuka"},
        {"code": "SA19", "jp": "大塚駅前", "en": "Otsuka-ekimae"},
        {"code": "SA23", "jp": "東池袋四丁目", "en": "Higashi-ikebukuro-yonchome"},
        {"code": "SA30", "jp": "早稲田", "en": "Waseda"},
    ],
    "hiroden": [
        {"code": "HI01", "jp": "広島駅", "en": "Hiroshima Station"},
        {"code": "HI02", "jp": "猿猴橋町", "en": "Enkobashicho"},
        {"code": "HI03", "jp": "的場町", "en": "Matobacho"},
        {"code": "HI04", "jp": "稲荷町", "en": "Inarimachi"},
        {"code": "HI05", "jp": "銀山町", "en": "Kanayamacho"},
        {"code": "HI06", "jp": "八丁堀", "en": "Hatchobori"},
        {"code": "HI07", "jp": "立町", "en": "Tatemachi"},
        {"code": "HI08", "jp": "紙屋町東", "en": "Kamiyacho-higashi"},
        {"code": "HI09", "jp": "原爆ドーム前", "en": "Genbaku Dome-mae"},
        {"code": "HI10", "jp": "広電西広島", "en": "Hiroden Nishi-Hiroshima"},
    ],
    "lightline": [
        {"code": "UL01", "jp": "宇都宮駅東口", "en": "Utsunomiya East"},
        {"code": "UL02", "jp": "東宿郷", "en": "Higashi-Shukugo"},
        {"code": "UL03", "jp": "駅東公園前", "en": "Ekihigashi Park"},
        {"code": "UL04", "jp": "峰", "en": "Mine"},
        {"code": "UL05", "jp": "宇都宮大学陽東キャンパス", "en": "Yoto Campus"},
        {"code": "UL06", "jp": "平石", "en": "Hiraishi"},
        {"code": "UL07", "jp": "飛山城跡", "en": "Tobiyama Castle"},
        {"code": "UL08", "jp": "清原地区市民センター前", "en": "Kiyohara Civic Center"},
        {"code": "UL09", "jp": "清陵高校前", "en": "Seiryo HS"},
        {"code": "UL10", "jp": "芳賀台", "en": "Hagadai"},
        {"code": "UL11", "jp": "芳賀・高根沢工業団地", "en": "Haga-Takanezawa"},
    ],
}


def build_jobs(line_key: str, stations: list[dict[str, str]]) -> list[dict[str, str]]:
    jobs: list[dict[str, str]] = []

    for station in stations:
        code = station["code"]
        jp = station["jp"]
        en = station["en"]

        jobs.append(
            {
                "input": f"まもなく、{jp}、{jp}です。The next stop is {en}.",
                "out": f"{line_key}/{code}_approach.{DEFAULT_FORMAT}",
            }
        )
        jobs.append(
            {
                "input": f"{jp}、{jp}です。Arriving at {en}.",
                "out": f"{line_key}/{code}_arrived.{DEFAULT_FORMAT}",
            }
        )

    return jobs


def write_jsonl(path: Path, jobs: list[dict[str, str]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        for job in jobs:
            f.write(json.dumps(job, ensure_ascii=False) + "\n")


def resolve_tts_cli() -> Path:
    env = os.getenv("TTS_GEN")
    if env:
        return Path(env)

    codex_home = Path(os.getenv("CODEX_HOME", str(Path.home() / ".codex")))
    return codex_home / "skills" / "speech" / "scripts" / "text_to_speech.py"


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate stop audio with OpenAI speech CLI.")
    parser.add_argument("--line", choices=["all", *STOPS.keys()], default="all")
    parser.add_argument("--out-dir", default="assets/audio/stops")
    parser.add_argument("--voice", default=DEFAULT_VOICE)
    parser.add_argument("--model", default=DEFAULT_MODEL)
    parser.add_argument("--rpm", type=int, default=DEFAULT_RPM)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--keep-jobs", action="store_true")
    args = parser.parse_args()

    if not args.dry_run and not os.getenv("OPENAI_API_KEY"):
        print("OPENAI_API_KEY is not set. Run with --dry-run or set API key first.", file=sys.stderr)
        return 1

    tts_cli = resolve_tts_cli()
    if not tts_cli.exists():
        print(f"TTS CLI not found: {tts_cli}", file=sys.stderr)
        return 1

    selected_lines = STOPS.keys() if args.line == "all" else [args.line]
    jobs: list[dict[str, str]] = []
    for line_key in selected_lines:
        jobs.extend(build_jobs(line_key, STOPS[line_key]))

    jobs_path = Path("tmp/speech/stop_jobs.jsonl")
    write_jsonl(jobs_path, jobs)

    instructions = (
        "Voice Affect: Clear onboard announcement. "
        "Tone: Professional and calm. "
        "Pacing: Moderate and intelligible. "
        "Emotion: Neutral and informative. "
        "Pronunciation: Enunciate station names clearly. "
        "Delivery: Japanese first, then English."
    )

    cmd = [
        sys.executable,
        str(tts_cli),
        "speak-batch",
        "--input",
        str(jobs_path),
        "--out-dir",
        args.out_dir,
        "--voice",
        args.voice,
        "--model",
        args.model,
        "--response-format",
        DEFAULT_FORMAT,
        "--rpm",
        str(args.rpm),
        "--instructions",
        instructions,
    ]

    if args.dry_run:
        cmd.append("--dry-run")

    result = subprocess.run(cmd, check=False)

    if not args.keep_jobs:
        jobs_path.unlink(missing_ok=True)

    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
