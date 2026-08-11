const fs = require('fs');

async function main() {
  const { PDFParse } = await import('./frontend/node_modules/pdf-parse/dist/pdf-parse/esm/index.js');
  const buf = fs.readFileSync('./inquisitors srs.pdf');
  const parser = new PDFParse({ data: new Uint8Array(buf) });
  const result = await parser.getText();
  const text = result.text;
  fs.writeFileSync('./srs_text.txt', text);
  console.log('DONE. Chars:', text.length);
}

main().catch(e => console.error(e.message));
