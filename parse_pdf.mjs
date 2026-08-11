import { PDFParse } from './frontend/node_modules/pdf-parse/dist/pdf-parse/esm/index.js';
import { readFileSync, writeFileSync } from 'fs';

async function main() {
  const buf = readFileSync('./inquisitors srs.pdf');
  const parser = new PDFParse({ data: new Uint8Array(buf) });
  const result = await parser.getText();
  const text = result.text;
  writeFileSync('./srs_text.txt', text);
  console.log('DONE. Chars:', text.length);
  console.log(text.slice(0, 8000));
}

main().catch(e => console.error(e.message, e.stack));
