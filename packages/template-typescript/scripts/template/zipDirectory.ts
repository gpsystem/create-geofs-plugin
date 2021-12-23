import * as archiver from "archiver";
import { createWriteStream } from "fs";

export function zipDirectory(sourceDir: string, outPath: string) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = createWriteStream(outPath);

  return new Promise<void>((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}
