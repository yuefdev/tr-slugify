# tr-slugify

Tiny, zero-dependency slugify for Turkish text.

```js
const slugify = require('tr-slugify');

slugify('Çalışkan Öğrenci Şükrü');                        // 'caliskan-ogrenci-sukru'
slugify("İstanbul'da güneşli gün!");                      // 'istanbul-da-gunesli-gun'
slugify('Merhaba Dünya', { separator: '_' });             // 'merhaba_dunya'
slugify('Kedi & Köpek', { replacements: { '&': 've' } }); // 'kedi-ve-kopek'
```

## Why

Most slugify libraries get `ı` and `İ` wrong: `ı` has no Unicode decomposition, and
`'İ'.toLowerCase()` leaves a stray combining dot. This package handles both.

## Options

| Option         | Default    | Description                                              |
| -------------- | ---------- | -------------------------------------------------------- |
| `separator`    | `'-'`      | String placed between words.                             |
| `lowercase`    | `true`     | Lower-case the result.                                   |
| `maxLength`    | `Infinity` | Maximum length; cuts at a word boundary where possible.  |
| `replacements` | `{}`       | Substrings to swap before slugifying, e.g. `{ '&': 've' }`. |

TypeScript types are included; the options type is exported as `SlugifyOptions`.

## Development

```bash
npm test
```

Requires Node.js 18 or later.

## Licence

[MIT](LICENSE)
