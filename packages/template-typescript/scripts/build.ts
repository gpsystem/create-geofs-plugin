import { prepareBuild } from "./prepareBuild";
import { runTsc } from "./runTsc";
import { zipTemplate } from "./template";

prepareBuild();
Promise.all([zipTemplate(), runTsc()]);
