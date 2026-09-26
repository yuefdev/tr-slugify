'use strict';

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
    .replace(/ı/g, 'i')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .join(separator);
}

module.exports = slugify;
module.exports.slugify = slugify;
