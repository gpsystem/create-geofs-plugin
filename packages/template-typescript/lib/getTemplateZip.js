(function (factory) {
  if (typeof module === "object" && typeof module.exports === "object") {
    var v = factory(require, exports);
    if (v !== undefined) module.exports = v;
  } else if (typeof define === "function" && define.amd) {
    define(["require", "exports", "fs", "path"], factory);
  }
})(function (require, exports) {
  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getTemplateZip = void 0;
  var fs_1 = require("fs");
  var path_1 = require("path");
  /**
   * Gets the template.
   * @returns null if there is no template, otherwise, returns a Buffer of the template.zip
   */
  function getTemplateZip() {
    var pathToTemplate = (0, path_1.join)(__dirname, "template.zip");
    if (!(0, fs_1.existsSync)(pathToTemplate)) {
      return null;
    }
    return (0, fs_1.readFileSync)(pathToTemplate);
  }
  exports.getTemplateZip = getTemplateZip;
});
