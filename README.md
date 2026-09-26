# tr-slugify

Tiny, zero-dependency slugify for Turkish text.

```js
const slugify = require('tr-slugify');

slugify('Çalışkan Öğrenci Şükrü');                   // 'caliskan-ogrenci-sukru'
slugify("İstanbul'da güneşli gün!");                 // 'istanbul-da-gunesli-gun'
slugify('Merhaba Dünya', { separator: '_' });       // 'merhaba_dunya'
```

## Why

Most slugify libraries get `ı` and `İ` wrong: `ı` has no Unicode decomposition, and
`'İ'.toLowerCase()` leaves a stray combining dot. This package handles both.

## Options

| Option      | Default | Description                        |
| ----------- | ------- | ---------------------------------- |
| `separator` | `'-'`   | String placed between words.       |
| `lowercase` | `true`  | Lower-case the result.             |

## Development

```bash
npm test
```

Requires Node.js 18 or later.

## Licence

[MIT](LICENSE)
