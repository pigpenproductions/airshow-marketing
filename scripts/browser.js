// Shared Chromium launcher. Uses PLAYWRIGHT_CHROMIUM if set, else the
// pre-installed browser, else Playwright's own download.
const fs = require('fs');
const { chromium } = require('playwright-core');

const CANDIDATES = [process.env.PLAYWRIGHT_CHROMIUM, '/opt/pw-browsers/chromium'].filter(Boolean);

async function launch() {
  const executablePath = CANDIDATES.find((p) => fs.existsSync(p));
  return chromium.launch(executablePath ? { executablePath } : {});
}

module.exports = { launch };
