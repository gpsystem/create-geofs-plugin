import { rmSync } from "fs-extra";
import { join } from "path";

function clearBin() {
  rmSync(join(__dirname, "..", "bin"), { recursive: true, force: true });
}

clearBin();
