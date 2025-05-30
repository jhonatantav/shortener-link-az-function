import * as fs from 'fs';
import * as path from 'path';

const filePath = path.join(process.cwd(), 'url-mapping.json');

export function saveMapping(shortId: string, originalUrl: string): void {
  const data = readAllMappings();
  data[shortId] = originalUrl;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function getOriginalUrl(shortId: string): string | undefined {
  const data = readAllMappings();
  return data[shortId];
}

function readAllMappings(): Record<string, string> {
  try {
    const file = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(file);
  } catch {
    return {};
  }
}
