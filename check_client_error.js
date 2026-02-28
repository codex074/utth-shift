const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[type="text"]', 'pha208'); 
    await page.fill('input[type="password"]', '1234');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
    
    await page.goto('http://localhost:3000/calendar', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const ptBtn = btns.find(b => b.textContent && b.textContent.includes('เจ้าพนักงานเภสัชกรรม'));
      if (ptBtn) ptBtn.click();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'calendar_pt_adjusted.png' });
    
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const offBtn = btns.find(b => b.textContent && b.textContent.includes('เจ้าหน้าที่'));
      if (offBtn) offBtn.click();
    });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'calendar_off_adjusted.png' });

  } catch (err) {
    console.log("Script error:", err);
  }
  await browser.close();
})();
