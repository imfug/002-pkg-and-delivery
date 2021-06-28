const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const process = require('process');


async function main() {

  let in_file_path = process.argv[2];

  let out_file = process.argv[3];

  const browser = await puppeteer.launch({
    args: ["--disable-dev-shm-usage", "--allow-file-access-from-files"],
  });

  const page = await browser.newPage();

  await page.goto("file://" + path.resolve(in_file_path));

  const rendered_html = await page.content();

  fs.writeFileSync(out_file, rendered_html);

  await browser.close();

}

main().catch(e => { console.error(e); process.exit(1) });
