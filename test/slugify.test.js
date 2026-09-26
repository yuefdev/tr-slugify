'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const slugify = require('..');

test('replaces Turkish characters', () => {
  assert.equal(slugify('Çalışkan Öğrenci Şükrü'), 'caliskan-ogrenci-sukru');
});

test('handles dotted and dotless capital I', () => {
  assert.equal(slugify('İstanbul IĞDIR'), 'istanbul-igdir');
});

test('drops punctuation and trims separators', () => {
  assert.equal(slugify("  --İstanbul'da güneşli gün!--  "), 'istanbul-da-gunesli-gun');
});

test('supports a custom separator', () => {
  assert.equal(slugify('Merhaba Dünya', { separator: '_' }), 'merhaba_dunya');
});

test('returns an empty string when nothing is left', () => {
  assert.equal(slugify('!!!'), '');
});

test('rejects non-string input', () => {
  assert.throws(() => slugify(42), TypeError);
});

test('rejects a non-string separator', () => {
  assert.throws(() => slugify('Merhaba', { separator: null }), TypeError);
  assert.throws(() => slugify('Merhaba', { separator: 1 }), TypeError);
});
