#!/usr/bin/env python3
# /// script
# dependencies = [
#   "playwright",
#   "pillow",
# ]
# ///

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

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(WORKSPACE_DIR), **kwargs)
    def log_message(self, format, *args):
        pass

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

def save_cover_images(png_path: Path, base_name: str):
    COVERS_DIR.mkdir(parents=True, exist_ok=True)
    out_png = COVERS_DIR / f"{base_name}.png"
    out_webp = COVERS_DIR / f"{base_name}.webp"

    with Image.open(png_path) as img:
        rgb_img = img.convert("RGB")
        # Resize to standard 16:9 (1280x720) if larger
        if rgb_img.width != 1280 or rgb_img.height != 720:
            rgb_img = rgb_img.resize((1280, 720), Image.Resampling.LANCZOS)
        rgb_img.save(out_png, "PNG", optimize=True)
        rgb_img.save(out_webp, "WEBP", quality=92, method=6)

    print(f"  ✓ Saved: {out_webp.name} ({out_webp.stat().st_size // 1024} KB)")

def main():
    port = get_free_port()
    server = HTTPServer(('127.0.0.1', port), QuietHandler)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    base_url = f"http://127.0.0.1:{port}"
    print(f"Local server started at {base_url}")

    from playwright.sync_api import sync_playwright
    import tempfile

    with tempfile.TemporaryDirectory() as temp_dir_str:
        temp_dir = Path(temp_dir_str)
        with sync_playwright() as p:
            browser = p.chromium.launch(
                executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
                headless=True,
                args=[
                    "--enable-webgl",
                    "--ignore-gpu-blocklist",
                    "--use-gl=angle",
                    "--use-angle=metal",
                    "--enable-gpu-rasterization",
                    "--no-sandbox"
                ]
            )
            context = browser.new_context(viewport={"width": 1280, "height": 720})
            page = context.new_page()

            # 1. qq-speed-3d
            print("Capturing qq-speed-3d...")
            try:
                page.goto(f"{base_url}/games/qq-speed-3d.html")
                page.wait_for_timeout(1000)
                # Click start button
                start_btn = page.locator("#start")
                if start_btn.count() > 0:
                    start_btn.click()
                page.wait_for_timeout(3000)
                tmp = temp_dir / "qq-speed-3d.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "qq-speed-3d")
            except Exception as e:
                print(f"Error qq-speed-3d: {e}")

            # 2. cf-transport-ship
            print("Capturing cf-transport-ship...")
            try:
                page.goto(f"{base_url}/games/cf-transport-ship.html")
                page.wait_for_timeout(1000)
                btn = page.locator("#btnStart")
                if btn.count() > 0:
                    btn.click()
                page.wait_for_timeout(3000)
                tmp = temp_dir / "cf-transport-ship.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "cf-transport-ship")
            except Exception as e:
                print(f"Error cf-transport-ship: {e}")

            # 3. pelican-bike
            print("Capturing pelican-bike...")
            try:
                page.goto(f"{base_url}/games/pelican-bike.html")
                page.wait_for_timeout(1000)
                btn = page.locator("#startBtn")
                if btn.count() > 0:
                    btn.click()
                page.wait_for_timeout(3500)
                tmp = temp_dir / "pelican-bike.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "pelican-bike")
            except Exception as e:
                print(f"Error pelican-bike: {e}")

            # 4. elemental-mage
            print("Capturing elemental-mage...")
            try:
                page.goto(f"{base_url}/games/elemental-mage.html")
                page.wait_for_timeout(600)
                page.evaluate("window.__game && window.__game.newGame()")
                page.wait_for_timeout(2000)
                page.evaluate("""
                    if (window.__game) {
                        window.__game.cast('boom', 720, 430);
                        window.__game.cast('bolt', 750, 430);
                        window.__game.cast('fire', 680, 410);
                    }
                """)
                page.wait_for_timeout(100)
                tmp = temp_dir / "elemental-mage.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "elemental-mage")
            except Exception as e:
                print(f"Error elemental-mage: {e}")

            # 5. saltline (online)
            print("Capturing saltline...")
            try:
                page.goto("https://realcodebear.github.io/saltline-fable-5.2/?autostart=1&q=ultra", timeout=25000)
                for _ in range(40):
                    ready = page.evaluate("() => { const b = document.getElementById('boot'); return b && b.classList.contains('done'); }")
                    if ready:
                        break
                    page.wait_for_timeout(500)
                page.wait_for_timeout(2500)
                tmp = temp_dir / "saltline.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "saltline")
            except Exception as e:
                print(f"Error saltline: {e}")

            # 6. black-myth-wukong (online)
            print("Capturing black-myth-wukong...")
            try:
                page.goto("https://wukong.cnmwx.com/", timeout=15000)
                page.wait_for_timeout(5000)
                tmp = temp_dir / "black-myth-wukong.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "black-myth-wukong")
            except Exception as e:
                print(f"Error black-myth-wukong: {e}")

            # 7. lol-aram (online)
            print("Capturing lol-aram...")
            try:
                page.goto("https://lol.hanyue.io/", timeout=15000)
                page.wait_for_timeout(4000)
                tmp = temp_dir / "lol-aram.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "lol-aram")
            except Exception as e:
                print(f"Error lol-aram: {e}")

            browser.close()

    server.shutdown()
    print("Done!")

if __name__ == "__main__":
    main()
