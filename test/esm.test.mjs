import test from 'node:test';
import assert from 'node:assert/strict';
import slugify, { slugify as named } from '../index.mjs';

test('ESM entry exposes default and named exports', () => {
  assert.equal(slugify('Merhaba Dünya'), 'merhaba-dunya');
  assert.equal(named, slugify);
});
