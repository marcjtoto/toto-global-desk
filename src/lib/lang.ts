import { defaultLang, locales, type Lang } from '../i18n/ui';

export { locales, type Lang };

export function isLang(value: string | undefined): value is Lang {
  return locales.includes(value as Lang);
}

export function langFromParam(value: string | undefined): Lang {
  return isLang(value) ? value : defaultLang;
}

export function localize(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${clean === '/' ? '/' : clean}`;
}

export function switchLang(current: Lang, next: Lang, pathname: string): string {
  const stripped = pathname.replace(/^\/(en|pt-br)(?=\/|$)/, '') || '/';
  return localize(next, stripped);
}

export function staticLangPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
