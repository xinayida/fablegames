#!/usr/bin/env python3
# /// script
# dependencies = [
#   "playwright",
#   "pillow",
# ]
# ///
"""
FableGames - Automated Real In-Game Screenshot & Cover Generator
Usage:
    uv run scripts/capture_covers.py
"""

import os
import sys
import time
import socket
import threading
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
from PIL import Image

WORKSPACE_DIR = Path(__file__).resolve().parent.parent
COVERS_DIR = WORKSPACE_DIR / "assets" / "covers"
GAMES_DIR = WORKSPACE_DIR / "games"

class QuietCORSRequestHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress standard request logging to keep output clean
        pass

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

def find_chrome_executable():
    candidates = [
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        "/Applications/Chromium.app/Contents/MacOS/Chromium",
        "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium-browser",
    ]
    for c in candidates:
        if os.path.isfile(c) and os.access(c, os.X_OK):
            return c
    return None

def save_cover_images(png_path: Path, base_name: str):
    """Save both optimized WebP and high-resolution PNG."""
    COVERS_DIR.mkdir(parents=True, exist_ok=True)
    out_png = COVERS_DIR / f"{base_name}.png"
    out_webp = COVERS_DIR / f"{base_name}.webp"

    with Image.open(png_path) as img:
        rgb_img = img.convert("RGB")
        # Save high quality PNG
        rgb_img.save(out_png, "PNG", optimize=True)
        # Save high quality WebP
        rgb_img.save(out_webp, "WEBP", quality=92, method=6)
    
    print(f"  ✓ Saved PNG:  {out_png.relative_to(WORKSPACE_DIR)} ({out_png.stat().st_size // 1024} KB)")
    print(f"  ✓ Saved WebP: {out_webp.relative_to(WORKSPACE_DIR)} ({out_webp.stat().st_size // 1024} KB)")

def capture_elemental_mage(page, base_url: str, temp_dir: Path):
    print("▶ 正在截取游戏: 元素法师 · 火球与闪电 (elemental-mage)...")
    url = f"{base_url}/games/elemental-mage.html"
    page.goto(url)
    page.wait_for_timeout(600)
    
    # Start game
    page.evaluate("window.__game.newGame()")
    # Wait for monsters to walk towards castle
    page.wait_for_timeout(2800)
    
    # Trigger dynamic spell combo: fireball + lightning bolt + explosion
    page.evaluate("""
        window.__game.cast('boom', 720, 430);
        window.__game.cast('bolt', 750, 430);
        window.__game.cast('fire', 680, 410);
    """)
    page.wait_for_timeout(90)
    
    temp_png = temp_dir / "elemental-mage.png"
    page.screenshot(path=str(temp_png))
    save_cover_images(temp_png, "elemental-mage")

def capture_saltline(page, temp_dir: Path):
    print("▶ 正在截取游戏: Saltline · 盐线 (saltline)...")
    url = "https://realcodebear.github.io/saltline-fable-5.2/?autostart=1&q=ultra"
    page.goto(url, timeout=25000)
    
    # Wait for loading / boot screen to finish
    print("  等待 3D 资产、WebGL 光影与着色器加载...")
    for _ in range(40):
        ready = page.evaluate("() => { const b = document.getElementById('boot'); return b && b.classList.contains('done'); }")
        if ready:
            break
        page.wait_for_timeout(500)
    
    # Wait for 3D world and shaders to fully render
    page.wait_for_timeout(2500)
    
    temp_png = temp_dir / "saltline.png"
    page.screenshot(path=str(temp_png))
    save_cover_images(temp_png, "saltline")

def main():
    os.chdir(WORKSPACE_DIR)
    port = get_free_port()
    server = HTTPServer(('127.0.0.1', port), QuietCORSRequestHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    base_url = f"http://127.0.0.1:{port}"
    print(f"本地服务已启动: {base_url}")

    chrome_exec = find_chrome_executable()
    if not chrome_exec:
        print("未检测到本地 Chrome 浏览器，将使用 Playwright 内置浏览器...")

    from playwright.sync_api import sync_playwright

    import tempfile
    with tempfile.TemporaryDirectory() as temp_dir_str:
        temp_dir = Path(temp_dir_str)
        with sync_playwright() as p:
            launch_kwargs = {
                "headless": True,
                "args": [
                    "--enable-webgl",
                    "--ignore-gpu-blocklist",
                    "--use-gl=angle",
                    "--use-angle=metal",
                    "--enable-gpu-rasterization",
                    "--no-sandbox"
                ]
            }
            if chrome_exec:
                launch_kwargs["executable_path"] = chrome_exec

            browser = p.chromium.launch(**launch_kwargs)
            context = browser.new_context(
                viewport={"width": 1280, "height": 720},
                device_scale_factor=1
            )
            page = context.new_page()

            # Capture all games
            capture_saltline(page, temp_dir)
            capture_elemental_mage(page, base_url, temp_dir)

            browser.close()

    server.shutdown()
    print("\n🎉 所有游戏的真实运行截图已成功截取并生成至 assets/covers/ ！")

if __name__ == "__main__":
    main()
