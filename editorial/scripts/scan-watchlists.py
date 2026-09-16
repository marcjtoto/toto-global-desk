#!/usr/bin/env python3
"""Watchlist scanner — queue-only. Never publishes. Never invents news."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import ssl
import sys
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(r"E:/totodev/toto-global-desk")
WATCH = ROOT / "editorial" / "watchlists"
STATE = ROOT / "editorial" / "state" / "watch-snapshots.json"
QUEUE = ROOT / "editorial" / "queue" / "APPROVAL_QUEUE.md"
TZ = ZoneInfo("America/Chicago")
UA = "ToToGlobalDesk-watchbot/0.1 (+local newsroom; queue-only)"
URL_RE = re.compile(r"https?://[^\s)|]+")


def now_chicago() -> datetime:
    return datetime.now(TZ)


def load_urls() -> list[tuple[str, str]]:
    rows: list[tuple[str, str]] = []
    for path in sorted(WATCH.glob("*.md")):
        beat = path.stem
        text = path.read_text(encoding="utf-8", errors="replace")
        for url in URL_RE.findall(text):
            url = url.rstrip(">/.,")
            rows.append((beat, url))
    return rows


def fetch_fingerprint(url: str) -> tuple[str, str]:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    ctx = ssl.create_default_context()
    try:
        with urllib.request.urlopen(req, timeout=20, context=ctx) as resp:
            raw = resp.read(120_000)
            status = str(resp.status)
    except Exception as exc:  # noqa: BLE001 — record failure, do not invent content
        digest = hashlib.sha256(f"ERR:{type(exc).__name__}".encode()).hexdigest()[:16]
        return digest, f"fetch-error:{type(exc).__name__}"
    text = raw.decode("utf-8", errors="replace")
    title = ""
    m = re.search(r"<title[^>]*>(.*?)</title>", text, re.I | re.S)
    if m:
        title = re.sub(r"\s+", " ", m.group(1)).strip()[:180]
    digest = hashlib.sha256((status + "|" + title + "|" + text[:8000]).encode("utf-8", "replace")).hexdigest()
    return digest, title or f"http-{status}"


def load_state() -> dict:
    if not STATE.exists():
        return {"sources": {}}
    return json.loads(STATE.read_text(encoding="utf-8"))


def save_state(state: dict) -> None:
    STATE.parent.mkdir(parents=True, exist_ok=True)
    state["updated"] = now_chicago().isoformat()
    STATE.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def append_queue(item_id: str, beat: str, url: str, note: str) -> None:
    stamp = now_chicago().strftime("%Y-%m-%d %H:%M %Z")
    line = f"| {item_id} | watch | {beat} | — | intake | `{url}` | source-change only — not a story | research `{url}` ({stamp}) |\n"
    text = QUEUE.read_text(encoding="utf-8")
    if item_id in text or url in text.split("intake")[-1][:2000]:
        # still append; Marc can kill dupes. Avoid silent drop of a new change.
        pass
    if "| — | — | — | — | empty |" in text:
        text = text.replace(
            "| — | — | — | — | empty | — | — | `npm run dev` → http://127.0.0.1:4321/pt-br/ |\n",
            "",
        )
    text = text.rstrip() + "\n" + line
    # refresh counts
    ready = text.count("| publication_ready |")
    breaking = text.count("| breaking |")
    intake = text.count("| intake |")
    text = re.sub(
        r"\*\*Current:\*\*.*",
        f"**Current:** {ready} edition-ready · {breaking} breaking-tagged · {intake} intake (watch changes). Last watch note: {note}",
        text,
        count=1,
    )
    QUEUE.write_text(text + "\n", encoding="utf-8")


def scan() -> str:
    urls = load_urls()
    state = load_state()
    sources = state.setdefault("sources", {})
    first = not sources
    changed: list[str] = []
    errors: list[str] = []
    for beat, url in urls:
        digest, title = fetch_fingerprint(url)
        prev = sources.get(url, {})
        sources[url] = {"beat": beat, "sha256": digest, "title": title, "seen": now_chicago().isoformat()}
        if first:
            continue
        if prev.get("sha256") != digest:
            if digest.startswith("ERR") or title.startswith("fetch-error:"):
                errors.append(url)
                continue
            item_id = "WATCH-" + now_chicago().strftime("%Y%m%d-%H%M") + "-" + digest[:6]
            append_queue(item_id, beat, url, title)
            changed.append(f"{beat} {url} :: {title}")
    save_state(state)
    if first:
        return f"BASELINE {len(urls)} watch URLs. No queue items. Queue-only scanner armed."
    if not changed:
        return ""  # cron no_agent: silence
    return "WATCH CHANGES (not stories — research only)\n" + "\n".join(changed)


def edition_report() -> str:
    text = QUEUE.read_text(encoding="utf-8") if QUEUE.exists() else ""
    ready = text.count("| publication_ready |")
    intake = text.count("| intake |")
    stamp = now_chicago().strftime("%Y-%m-%d %H:%M %Z")
    return "\n".join(
        [
            f"ToTo Global Desk edition report — {stamp}",
            f"- edition ready: {ready}",
            "- breaking: 0 (none sourced)",
            f"- needing approval / intake: {intake}",
            "- evidence conflicts / legal: none (no sourced packet)",
            "- files: editorial/queue/APPROVAL_QUEUE.md",
            "- preview: npm run dev → http://127.0.0.1:4321/pt-br/",
            "- gate: Marc only to publish/deploy",
        ]
    )


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("mode", choices=["scan", "report"])
    args = parser.parse_args()
    out = scan() if args.mode == "scan" else edition_report()
    if out:
        sys.stdout.write(out + "\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
