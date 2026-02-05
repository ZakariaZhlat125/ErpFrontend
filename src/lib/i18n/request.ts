import {getRequestConfig} from 'next-intl/server';
import path from 'path';
import {promises as fs} from 'fs';

type Messages = Record<string, any>;

const DEFAULT_LOCALE = 'en'; // غيّره إذا مشروعك عربي افتراضيًا

async function listNamespaces(locale?: string): Promise<string[]> {
  const safeLocale = locale || DEFAULT_LOCALE;

  const dir = path.join(
    process.cwd(),
    'src',
    'locales',
    safeLocale
  );

  try {
    const files = await fs.readdir(dir);

    const namespaces = files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));

    if (!namespaces.includes('public')) namespaces.unshift('public');

    return namespaces;
  } catch {
    return ['public'];
  }
}

async function loadNamespace(
  locale: string,
  ns: string
): Promise<Messages> {
  try {
    return (await import(`../../locales/${locale}/${ns}.json`)).default;
  } catch {
    return {};
  }
}

export default getRequestConfig(async ({requestLocale}) => {
  // requestLocale قد يكون undefined أول مرة
  const locale = (await requestLocale) || DEFAULT_LOCALE;

  const namespaces = await listNamespaces(locale);

  const messages: Record<string, any> = {};
  await Promise.all(
    namespaces.map(async (ns) => {
      messages[ns] = await loadNamespace(locale, ns);
    })
  );

  return {
    locale,
    messages
  };
});
