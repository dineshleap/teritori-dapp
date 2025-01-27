"use strict";

const builder = require("electron-builder");
const Platform = builder.Platform;

// Let's get that intellisense working
/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const options = {
  appId: `com.teritori`,
  productName: "Teritori",
  compression: "normal",
  removePackageScripts: true,
  files: [
    "build/linux",
    "web-build/**/*",
    "node_modules/**/*",
    "package.json",
    "main.js",
    "icon.icns",
    "splash.html",
    "splash.png",
    "preload.js",
  ],
  nodeGypRebuild: false,
  buildDependenciesFromSource: false,
  directories: {
    output: "dist/artifacts/local",
    buildResources: "installer/resources",
  },

  linux: {
    desktop: {
      StartupNotify: "false",
      Encoding: "UTF-8",
      MimeType: "x-scheme-handler/deeplink",
    },
    target: ["AppImage", "rpm", "deb"],
    asar: true,
    asarUnpack: ["build/*"],
  },
  deb: {
    priority: "optional",
    afterInstall: "installer/linux/after-install.tpl",
  },
  rpm: {
    fpm: ["--before-install", "installer/linux/before-install.tpl"],
    afterInstall: "installer/linux/after-install.tpl",
  },
};

builder
  .build({
    targets: Platform.LINUX.createTarget(),
    config: options,
  })
  .then((result) => {
    console.log(JSON.stringify(result));
  })
  .catch((error) => {
    console.error(error);
  });
