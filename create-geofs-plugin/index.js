#!/usr/bin/env node

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
// create-geofs-plugin is installed globally on people's computers. This means
// that it is extremely difficult to have them upgrade the version and
// because there's only one global version installed, it is very prone to
// breaking changes.
//
// Do not make breaking changes! We absolutely don't want to have to
// tell people to update their global version of create-geofs-plugin.
//
// Also be careful with new language features.
// This file must work on Node 0.10+.
//
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//   /!\ DO NOT MODIFY THIS FILE /!\
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

"use strict";

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split(".");
const major = Number(semver[0]);

if (major < 14) {
  console.error(
    "You are running Node " +
      currentNodeVersion +
      ".\n" +
      "Create GeoFS Plugin requires Node 14 or higher. \n" +
      "Please update your version of Node."
  );
  process.exit(1);
}

const { start } = require("./bin/create-geofs-plugin");

start(process.argv);
