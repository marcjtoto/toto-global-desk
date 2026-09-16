import { defaultLang, locales, type Lang } from '../i18n/ui';

export { locales, type Lang };

function basePrefix(): string {
  return (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
}

export function withBase(path: string): string {
  const base = basePrefix();
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function isLang(value: string | undefined): value is Lang {
  return locales.includes(value as Lang);
}

export function langFromParam(value: string | undefined): Lang {
  return isLang(value) ? value : defaultLang;
}

export function localize(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const rest = clean === '/' ? '/' : clean;
  return `${basePrefix()}/${lang}${rest === '/' ? '/' : rest}`;
}

export function switchLang(_current: Lang, next: Lang, pathname: string): string {
  const base = basePrefix();
  let path = pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || '/';
  }
  const stripped = path.replace(/^\/(en|pt-br)(?=\/|$)/, '') || '/';
  return localize(next, stripped);
}

export function staticLangPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
