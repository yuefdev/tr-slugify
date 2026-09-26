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
function slugify(input, { separator = '-', lowercase = true } = {}) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify expects a string');
  }
  if (typeof separator !== 'string') {
    throw new TypeError('separator must be a string');
  }

  let text = input
    .replace(DOTLESS_I, 'i')
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '');

  if (lowercase) {
    text = text.toLowerCase();
  }

  return text.split(NON_ALPHANUMERIC).filter(Boolean).join(separator);
}

module.exports = slugify;
module.exports.slugify = slugify;
