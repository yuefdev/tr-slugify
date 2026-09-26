declare namespace slugify {
  interface SlugifyOptions {
    /** String placed between words. Defaults to `'-'`. */
    separator?: string;
    /** Lower-case the result. Defaults to `true`. */
    lowercase?: boolean;
    /** Maximum length; cuts at a word boundary where possible. Defaults to `Infinity`. */
    maxLength?: number;
    /** Substrings to swap before slugifying, e.g. `{ '&': 've' }`. */
    replacements?: Record<string, string>;
  }
}

interface Slugify {
  /**
   * Turns Turkish (or any Latin-script) text into a URL-safe slug.
   *
   * @example
   * slugify('Çalışkan Öğrenci Şükrü'); // 'caliskan-ogrenci-sukru'
   */
  (input: string, options?: slugify.SlugifyOptions): string;
  slugify: Slugify;
}

declare const slugify: Slugify;

export = slugify;
