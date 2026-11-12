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
        w, h = rgb_img.size
        target_ratio = 16 / 9
        current_ratio = w / h

        if abs(current_ratio - target_ratio) > 0.05:
            if current_ratio > target_ratio:
                new_w = int(h * target_ratio)
                left = (w - new_w) // 2
                rgb_img = rgb_img.crop((left, 0, left + new_w, h))
            else:
                new_h = int(w / target_ratio)
                top = (h - new_h) // 2
                rgb_img = rgb_img.crop((0, top, w, top + new_h))

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

            # Existing local games
            # 1. qq-speed-3d
            print("Capturing qq-speed-3d...")
            try:
                page.goto(f"{base_url}/games/qq-speed-3d.html")
                page.wait_for_timeout(1000)
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

            # 5. doubao-dance
            print("Capturing doubao-dance...")
            try:
                page.goto(f"{base_url}/games/doubao-dance.html")
                page.wait_for_timeout(1000)
                btn = page.locator("#btnStart")
                if btn.count() > 0:
                    btn.click()
                page.wait_for_timeout(3500)
                page.keyboard.press("ArrowLeft")
                page.keyboard.press("ArrowUp")
                page.keyboard.press("Space")
                page.wait_for_timeout(500)
                tmp = temp_dir / "doubao-dance.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "doubao-dance")
            except Exception as e:
                print(f"Error doubao-dance: {e}")

            # 6. voxel-gta
            print("Capturing voxel-gta...")
            try:
                page.goto(f"{base_url}/games/voxel-gta.html")
                page.wait_for_timeout(1000)
                page.mouse.click(640, 360)
                page.wait_for_timeout(1500)
                page.keyboard.down("KeyW")
                page.wait_for_timeout(800)
                page.keyboard.up("KeyW")
                tmp = temp_dir / "voxel-gta.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "voxel-gta")
            except Exception as e:
                print(f"Error voxel-gta: {e}")

            # 7. frostline-kart
            print("Capturing frostline-kart...")
            try:
                page.goto(f"{base_url}/games/frostline-kart.html")
                page.wait_for_timeout(1000)
                page.keyboard.press("Space")
                page.wait_for_timeout(500)
                page.keyboard.down("ArrowUp")
                page.wait_for_timeout(2500)
                page.keyboard.up("ArrowUp")
                tmp = temp_dir / "frostline-kart.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "frostline-kart")
            except Exception as e:
                print(f"Error frostline-kart: {e}")

            # 8. robo-tennis
            print("Capturing robo-tennis...")
            try:
                page.goto(f"{base_url}/games/robo-tennis.html")
                page.wait_for_timeout(2500)
                page.keyboard.press("Space")
                page.wait_for_timeout(800)
                tmp = temp_dir / "robo-tennis.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "robo-tennis")
            except Exception as e:
                print(f"Error robo-tennis: {e}")

            # 9. rail-rush
            print("Capturing rail-rush...")
            try:
                page.goto(f"{base_url}/games/rail-rush.html")
                page.wait_for_timeout(1000)
                start_btn = page.locator("#start")
                if start_btn.count() > 0:
                    start_btn.click()
                else:
                    page.keyboard.press("Space")
                page.wait_for_timeout(2500)
                tmp = temp_dir / "rail-rush.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "rail-rush")
            except Exception as e:
                print(f"Error rail-rush: {e}")

            # 10. crossy-farm
            print("Capturing crossy-farm...")
            try:
                page.goto(f"{base_url}/games/crossy-farm.html")
                page.wait_for_timeout(1000)
                btn = page.locator("#btnDrive")
                if btn.count() > 0:
                    btn.click()
                page.wait_for_timeout(1000)
                page.keyboard.press("ArrowUp")
                page.wait_for_timeout(300)
                page.keyboard.press("ArrowUp")
                page.wait_for_timeout(300)
                page.keyboard.press("ArrowUp")
                page.wait_for_timeout(500)
                tmp = temp_dir / "crossy-farm.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "crossy-farm")
            except Exception as e:
                print(f"Error crossy-farm: {e}")

            # 11. mario-world
            print("Capturing mario-world...")
            try:
                page.goto(f"{base_url}/games/mario-world.html")
                page.wait_for_timeout(1000)
                page.evaluate("newGame(); startLevel();")
                page.wait_for_timeout(500)
                page.keyboard.down("ArrowRight")
                page.wait_for_timeout(1200)
                page.keyboard.press("Space")
                page.wait_for_timeout(200)
                page.keyboard.up("ArrowRight")
                tmp = temp_dir / "mario-world.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "mario-world")
            except Exception as e:
                print(f"Error mario-world: {e}")

            # 12. hollowmere
            print("Capturing hollowmere...")
            try:
                page.goto(f"{base_url}/games/hollowmere.html")
                page.wait_for_timeout(1500)
                page.evaluate("summonBoss()")
                page.wait_for_timeout(1200)
                tmp = temp_dir / "hollowmere.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "hollowmere")
            except Exception as e:
                print(f"Error hollowmere: {e}")

            # 13. flappy-skies
            print("Capturing flappy-skies...")
            try:
                page.goto(f"{base_url}/games/flappy-skies.html")
                page.wait_for_timeout(1000)
                page.keyboard.press("Space")
                page.wait_for_timeout(600)
                page.keyboard.press("Space")
                page.wait_for_timeout(800)
                tmp = temp_dir / "flappy-skies.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "flappy-skies")
            except Exception as e:
                print(f"Error flappy-skies: {e}")

            # 14. vector-descent
            print("Capturing vector-descent...")
            try:
                page.goto(f"{base_url}/games/vector-descent.html")
                page.wait_for_timeout(1000)
                btn = page.locator("#bStart")
                if btn.count() > 0:
                    btn.click()
                page.wait_for_timeout(1500)
                page.keyboard.down("ArrowUp")
                page.wait_for_timeout(1000)
                page.keyboard.up("ArrowUp")
                tmp = temp_dir / "vector-descent.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "vector-descent")
            except Exception as e:
                print(f"Error vector-descent: {e}")

            # 15. sorrow-rock
            print("Capturing sorrow-rock...")
            try:
                page.goto(f"{base_url}/games/sorrow-rock.html")
                page.wait_for_timeout(2500)
                tmp = temp_dir / "sorrow-rock.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "sorrow-rock")
            except Exception as e:
                print(f"Error sorrow-rock: {e}")

            # 16. ariadnes-thread
            print("Capturing ariadnes-thread...")
            try:
                page.goto(f"{base_url}/games/ariadnes-thread.html")
                page.wait_for_timeout(2000)
                page.keyboard.press("ArrowRight")
                page.wait_for_timeout(300)
                page.keyboard.press("ArrowDown")
                page.wait_for_timeout(300)
                page.keyboard.press("ArrowRight")
                page.wait_for_timeout(500)
                tmp = temp_dir / "ariadnes-thread.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "ariadnes-thread")
            except Exception as e:
                print(f"Error ariadnes-thread: {e}")

            # 17. the-combination
            print("Capturing the-combination...")
            try:
                page.goto(f"{base_url}/games/the-combination.html")
                page.wait_for_timeout(2000)
                tmp = temp_dir / "the-combination.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "the-combination")
            except Exception as e:
                print(f"Error the-combination: {e}")

            # 18. gelato-tower
            print("Capturing gelato-tower...")
            try:
                page.goto(f"{base_url}/games/gelato-tower.html")
                page.wait_for_timeout(1000)
                page.keyboard.press("Space")
                page.wait_for_timeout(1500)
                page.keyboard.press("Space")
                page.wait_for_timeout(1500)
                tmp = temp_dir / "gelato-tower.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "gelato-tower")
            except Exception as e:
                print(f"Error gelato-tower: {e}")

            # Online games
            # 19. saltline (online)
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

            # 20. black-myth-wukong (online)
            print("Capturing black-myth-wukong...")
            try:
                page.goto("https://wukong.cnmwx.com/", timeout=15000)
                page.wait_for_timeout(5000)
                tmp = temp_dir / "black-myth-wukong.png"
                page.screenshot(path=str(tmp))
                save_cover_images(tmp, "black-myth-wukong")
            except Exception as e:
                print(f"Error black-myth-wukong: {e}")

            # 21. lol-aram (online)
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
