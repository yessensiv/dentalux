import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const photos = [
  ["doctors/ivanova.jpg", "photo-1559839734-2b71ea197ec2", 800],
  ["doctors/petrov.jpg", "photo-1622253692010-333f2da6031d", 800],
  ["doctors/smirnov.jpg", "photo-1612349317150-e413f6a5b16d", 800],
  ["doctors/kozlova.jpg", "photo-1594824476967-48c8b964273f", 800],
  ["clinic/interior.jpg", "photo-1629909613654-28e377c37b09", 1400],
];
const failures = [];
await Promise.all(photos.map(async ([file, photo, width]) => {
  try {
    const response = await fetch(`https://images.unsplash.com/${photo}?w=${width}&q=85&fm=jpg`, { signal: AbortSignal.timeout(30000) });
    if (!response.ok || !response.headers.get("content-type")?.startsWith("image/")) throw new Error(`HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 1000 || bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error("Invalid JPEG");
    const target = path.resolve("public/images", file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes);
    console.log(`${file}: saved ${bytes.length} bytes`);
  } catch (error) { failures.push(file); console.error(`${file}: ${error.message}`); }
}));
if (failures.length) process.exitCode = 1;
