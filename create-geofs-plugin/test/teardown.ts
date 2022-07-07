import { rmSync } from "node:fs";
import { testTargetDirRoot__DO_NOT_USE } from "./utils/testDirectories";

export default function teardown() {
  rmSync(testTargetDirRoot__DO_NOT_USE, { force: true, recursive: true });
}
