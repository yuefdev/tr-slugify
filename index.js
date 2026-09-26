'use strict';

const DOTLESS_I = /ı/g;
const COMBINING_MARKS = /[\u0300-\u036f]/g;
const NON_ALPHANUMERIC = /[^A-Za-z0-9]+/;

/**
 * Turns Turkish (or any Latin-script) text into a URL-safe slug.
 *
 * NFKD strips most diacritics (ç, ğ, ö, ş, ü, İ), but the dotless ı has no
 * decomposition, so it is mapped by hand first.
 */
function slugify(
  input,
  { separator = '-', lowercase = true, maxLength = Infinity, replacements = {} } = {},
) {
  if (typeof input !== 'string') {
    throw new TypeError('slugify expects a string');
  }
  if (typeof separator !== 'string') {
    throw new TypeError('separator must be a string');
  }
  if (maxLength !== Infinity && !(Number.isInteger(maxLength) && maxLength > 0)) {
    throw new RangeError('maxLength must be a positive integer');
  }
  if (replacements === null || typeof replacements !== 'object' || Array.isArray(replacements)) {
    throw new TypeError('replacements must be an object');
  }

  let text = input;
  for (const [from, to] of Object.entries(replacements)) {
    if (typeof to !== 'string') {
      throw new TypeError(`replacement for "${from}" must be a string`);
    }
    if (from) {
      text = text.split(from).join(to);
    }
  }

  text = text
    .replace(DOTLESS_I, 'i')
    .normalize('NFKD')
    .replace(COMBINING_MARKS, '');

  if (lowercase) {
    text = text.toLowerCase();
  }

  const words = text.split(NON_ALPHANUMERIC).filter(Boolean);
  return truncate(words, separator, maxLength);
}

/**
 * Joins words up to maxLength, cutting at a word boundary. A single word
 * longer than maxLength is cut mid-word rather than returning nothing.
 */
function truncate(words, separator, maxLength) {
  if (words.length === 0) {
    return '';
  }

  let result = words[0].slice(0, maxLength);
  for (let i = 1; i < words.length; i++) {
    const next = result + separator + words[i];
    if (next.length > maxLength) {
      break;
    }
    result = next;
  }
  return result;
}

module.exports = slugify;
module.exports.slugify = slugify;
