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

test('keeps the original case when lowercase is false', () => {
  assert.equal(slugify('Çalışkan Öğrenci', { lowercase: false }), 'Caliskan-Ogrenci');
  assert.equal(slugify('İSTANBUL', { lowercase: false }), 'ISTANBUL');
});

test('truncates at a word boundary with maxLength', () => {
  const title = 'Çalışkan Öğrenci Şükrü';
  assert.equal(slugify(title, { maxLength: 16 }), 'caliskan-ogrenci');
  assert.equal(slugify(title, { maxLength: 15 }), 'caliskan');
  assert.equal(slugify(title, { maxLength: 100 }), 'caliskan-ogrenci-sukru');
});

test('cuts a single long word when it exceeds maxLength', () => {
  assert.equal(slugify('Muvaffakiyetsizleştiricileştiriveremeyebileceklerimizdenmişsinizcesine', { maxLength: 8 }), 'muvaffak');
});

test('rejects an invalid maxLength', () => {
  assert.throws(() => slugify('Merhaba', { maxLength: 0 }), RangeError);
  assert.throws(() => slugify('Merhaba', { maxLength: 2.5 }), RangeError);
  assert.throws(() => slugify('Merhaba', { maxLength: '10' }), RangeError);
});

test('applies custom replacements before slugifying', () => {
  assert.equal(slugify('Kedi & Köpek', { replacements: { '&': 've' } }), 'kedi-ve-kopek');
  assert.equal(slugify('%50 indirim', { replacements: { '%': 'yuzde ' } }), 'yuzde-50-indirim');
});

test('rejects invalid replacements', () => {
  assert.throws(() => slugify('a', { replacements: null }), TypeError);
  assert.throws(() => slugify('a', { replacements: ['&'] }), TypeError);
  assert.throws(() => slugify('a', { replacements: { '&': 1 } }), TypeError);
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
