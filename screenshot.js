const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = "https://www.750hrstracker.com/landing";

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Create screenshots folder if it doesn't exist
    const screenshotDir = path.join(__dirname, "screenshots");
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }

    // Full page screenshot
    const fullPagePath = path.join(screenshotDir, "full-page.png");
    await page.screenshot({ path: fullPagePath, fullPage: true });
    console.log(`✓ Full page screenshot saved: ${fullPagePath}`);

    // Desktop viewport screenshot
    await page.setViewport({ width: 1920, height: 1080 });
    const desktopPath = path.join(screenshotDir, "desktop-view.png");
    await page.screenshot({ path: desktopPath });
    console.log(`✓ Desktop view screenshot saved: ${desktopPath}`);

    // Mobile viewport screenshot
    await page.setViewport({ width: 375, height: 667 });
    const mobilePath = path.join(screenshotDir, "mobile-view.png");
    await page.screenshot({ path: mobilePath });
    console.log(`✓ Mobile view screenshot saved: ${mobilePath}`);

    // Tablet viewport screenshot
    await page.setViewport({ width: 768, height: 1024 });
    const tabletPath = path.join(screenshotDir, "tablet-view.png");
    await page.screenshot({ path: tabletPath });
    console.log(`✓ Tablet view screenshot saved: ${tabletPath}`);
  } catch (error) {
    console.error("Error taking screenshots:", error);
  } finally {
    await browser.close();
  }
}

takeScreenshots();
