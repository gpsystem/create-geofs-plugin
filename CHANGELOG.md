# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.3.1](https://github.com/gpsystem/create-geofs-plugin/compare/v0.3.0...v0.3.1) (2022-06-05)

### Bug Fixes

- **getAllPossibleFiles:** :adhesive_bandage: avoid edge-case when checking files for common template ([ed20832](https://github.com/gpsystem/create-geofs-plugin/commit/ed208325ee45bb07a53e3dd8b8b6455be000154d))

## [0.3.0](https://github.com/gpsystem/create-geofs-plugin/compare/v0.2.0...v0.3.0) (2022-06-03)

### ⚠ BREAKING CHANGES

- drops support for EOL node 12

- drop node 12 ([28327c8](https://github.com/gpsystem/create-geofs-plugin/commit/28327c8ddd7d36790285759dc9612d9cff4b3f87))

## [0.2.0](https://github.com/gpsystem/create-geofs-plugin/compare/v0.1.1...v0.2.0) (2022-04-25)

### Features

- **npm:** inform user during npm install ([ddaa7db](https://github.com/gpsystem/create-geofs-plugin/commit/ddaa7dbee3007f6388b16dd18eb3c40393634944)), closes [#128](https://github.com/gpsystem/create-geofs-plugin/issues/128)
- **templates:** :sparkles: create basic-ts template ([#127](https://github.com/gpsystem/create-geofs-plugin/issues/127)) ([a0dd931](https://github.com/gpsystem/create-geofs-plugin/commit/a0dd9319d5075b84af4c0678f2efe465add5965a))

### Bug Fixes

- **config:** :adhesive_bandage: pass argv to start function ([1bcb2e3](https://github.com/gpsystem/create-geofs-plugin/commit/1bcb2e369d9b836ca8646455b4c9ea1de4517d95))
- **config:** add `year` to config ([6ed2e45](https://github.com/gpsystem/create-geofs-plugin/commit/6ed2e455205283582107ea46c52313a732a1e076)), closes [#129](https://github.com/gpsystem/create-geofs-plugin/issues/129)
- **templates:** remove one pair of braces from LICENSE files ([a1576ab](https://github.com/gpsystem/create-geofs-plugin/commit/a1576ab4526a0ffa1429a60db8faabf7cd9f63f7)), closes [#130](https://github.com/gpsystem/create-geofs-plugin/issues/130)

### [0.1.5](https://github.com/gpsystem/create-geofs-plugin/compare/v0.1.4...v0.1.5) (2022-03-28)

### Bug Fixes

- :ambulance: Cherry-pick commit 3e1830a5c98aa402ec7fd4984453280c02cdccd2 into release-v0.1 ([f5ff7e7](https://github.com/gpsystem/create-geofs-plugin/commit/f5ff7e79655a154160902ee202c3c7087b268ad6)), closes [#98](https://github.com/gpsystem/create-geofs-plugin/issues/98) [#98](https://github.com/gpsystem/create-geofs-plugin/issues/98) [#98](https://github.com/gpsystem/create-geofs-plugin/issues/98) [#100](https://github.com/gpsystem/create-geofs-plugin/issues/100)

### [0.1.4](https://github.com/gpsystem/create-geofs-plugin/compare/v0.1.3...v0.1.4) (2022-03-27)

### Bug Fixes

- **questions:** :bug: Cherry-pick commit 83b6d8aad53c558e6d123e09c00840f729832826 into release-0.1 ([f106a75](https://github.com/gpsystem/create-geofs-plugin/commit/f106a756ea3fe900ee1e30e8681e118a57d0e40d))

### [0.1.3](https://github.com/gpsystem/create-geofs-plugin/compare/v0.1.2...v0.1.3) (2022-03-27)

### Bug Fixes

- :ambulance: include bin in releases ([cceab5c](https://github.com/gpsystem/create-geofs-plugin/commit/cceab5c77ea3c6c0d2653e6e491c2e12c28afcf2))

### [0.1.2](https://github.com/gpsystem/create-geofs-plugin/compare/v0.1.1...v0.1.2) (2022-03-27)

### Bug Fixes

- :ambulance: Cherry-pick 8f8fa3efed58cb184d41cca1e85f5e78f3c6a318 into release-0.1.2 ([e208d91](https://github.com/gpsystem/create-geofs-plugin/commit/e208d917a2b439977f2e13a5c7993ac03e1372e9))
- **deps:** :ambulance: Cherry-pick d86bc46b5e201c6c3dddc9408749891c2542292b into release-0.1.2 ([cd8e837](https://github.com/gpsystem/create-geofs-plugin/commit/cd8e837643c8686080888e5270e67dec1fda7595)), closes [#35](https://github.com/gpsystem/create-geofs-plugin/issues/35)

### [0.1.1](https://github.com/gpsystem/create-geofs-plugin/compare/v0.1.0...v0.1.1) (2022-03-18)

## 0.1.0 (2022-03-05)

### Features

- added basic-js template ([f433007](https://github.com/gpsystem/create-geofs-plugin/commit/f433007af58a368b8e492328ac727ebc0097a924)), closes [#45](https://github.com/gpsystem/create-geofs-plugin/issues/45)
- added git initialization ([344fe3d](https://github.com/gpsystem/create-geofs-plugin/commit/344fe3db84c116db5696cd5aeafeb5cb3930a84f))
- handle configuration ([9aa8b01](https://github.com/gpsystem/create-geofs-plugin/commit/9aa8b015613f6888d246a8bfc2c8e5cc074fb46d))
- initialize a git repository ([416c0ff](https://github.com/gpsystem/create-geofs-plugin/commit/416c0ff79d3eb14d45831403f22fe6f466fac5ef))
- install npm packages and build ([301e99c](https://github.com/gpsystem/create-geofs-plugin/commit/301e99cd74d0dd49c039d9adcf7a4c41e0b916dc))
- scaffold files with dynamic content ([d871045](https://github.com/gpsystem/create-geofs-plugin/commit/d871045a9a0fd8fb0f1f82d2172235c668f51637))

### Bug Fixes

- ignore all node_modules files ([747ad87](https://github.com/gpsystem/create-geofs-plugin/commit/747ad879767793b5aab6a7c9bce91b2026c486e4))
