# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses
[Semantic Versioning](https://semver.org/).

## [0.2.0] - 2026-09-27

### Added

- `lowercase` option to keep the original case.
- `maxLength` option that truncates at a word boundary.
- `replacements` option to swap substrings before slugifying.
- Mapping for Latin letters that NFKD cannot strip: ß, æ, œ, ø, đ, ð, ł, þ.
- TypeScript type definitions, including `SlugifyOptions`.
- ESM entry point with default and named exports.

### Changed

- Published on npm as `turkce-slugify`, since `tr-slugify` is already taken.
- Invalid options now throw: a non-string `separator` or non-object
  `replacements` throws a `TypeError`, and an invalid `maxLength` throws a
  `RangeError`.

## [0.1.0] - 2026-09-27

### Added

- `slugify(input, { separator })` with correct handling of `ı` and `İ`.

[0.2.0]: https://github.com/yuefdev/tr-slugify/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/yuefdev/tr-slugify/releases/tag/v0.1.0
