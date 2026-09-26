'use strict';

const DOTLESS_I = /ı/g;
const COMBINING_MARKS = /[̀-ͯ]/g;
const NON_ALPHANUMERIC = /[^A-Za-z0-9]+/;

/**
 * Turns Turkish (or any Latin-script) text into a URL-safe slug.
 *
 * NFKD strips most diacritics (ç, ğ, ö, ş, ü, İ), but the dotless ı has no
 * decomposition, so it is mapped by hand first.
 */
function slugify(input, { separator = '-' } = {}) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify expects a string');
  }

  return input
    .replace(DOTLESS_I, 'i')
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .split(NON_ALPHANUMERIC)
    .filter(Boolean)
    .join(separator);
}

module.exports = slugify;
module.exports.slugify = slugify;
