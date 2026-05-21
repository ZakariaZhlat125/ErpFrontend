import {getRequestConfig} from 'next-intl/server';
import path from 'path';
import {promises as fs} from 'fs';

type Messages = Record<string, any>;

const DEFAULT_LOCALE = 'en'; // غيّره إذا مشروعك عربي افتراضيًا

async function listNamespaces(locale?: string): Promise<string[]> {
  const safeLocale = locale || DEFAULT_LOCALE;

  const namespaces: string[] = ['public'];

  // Load from src/locales
  const mainLocaleDir = path.join(
    process.cwd(),
    'src',
    'locales',
    safeLocale
  );

  try {
    const files = await fs.readdir(mainLocaleDir);
    const mainNamespaces = files
      .filter((f) => f.endsWith('.json'))
      .map((f) => f.replace(/\.json$/, ''));
    
    mainNamespaces.forEach(ns => {
      if (!namespaces.includes(ns)) namespaces.push(ns);
    });
  } catch {}

  // Load from features/{feature}/locales/{locale} (flat) and features/{group}/{sub}/locales/{locale} (nested)
  const featuresDir = path.join(process.cwd(), 'features');
  try {
    const entries = await fs.readdir(featuresDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      // Try flat: features/{feature}/locales/{locale}
      const flatLocaleDir = path.join(featuresDir, entry.name, 'locales', safeLocale);
      try {
        const files = await fs.readdir(flatLocaleDir);
        files
          .filter((f) => f.endsWith('.json'))
          .map((f) => f.replace(/\.json$/, ''))
          .forEach(ns => { if (!namespaces.includes(ns)) namespaces.push(ns); });
      } catch {}

      // Try nested: features/{group}/{sub}/locales/{locale} (Admin, MAIN, etc.)
      const groupDir = path.join(featuresDir, entry.name);
      try {
        const subEntries = await fs.readdir(groupDir, { withFileTypes: true });
        for (const sub of subEntries) {
          if (!sub.isDirectory()) continue;
          const nestedLocaleDir = path.join(groupDir, sub.name, 'locales', safeLocale);
          try {
            const files = await fs.readdir(nestedLocaleDir);
            files
              .filter((f) => f.endsWith('.json'))
              .map((f) => f.replace(/\.json$/, ''))
              .forEach(ns => { if (!namespaces.includes(ns)) namespaces.push(ns); });
          } catch {}
        }
      } catch {}
    }
  } catch {}

  return namespaces;
}

async function loadNamespace(
  locale: string,
  ns: string
): Promise<Messages> {
  // First try src/locales
  try {
    return (await import(`../../locales/${locale}/${ns}.json`)).default;
  } catch {}

  // Then try features/{feature}/locales (flat) and features/{group}/{sub}/locales (nested)
  try {
    const featuresDir = path.join(process.cwd(), 'features');
    const entries = await fs.readdir(featuresDir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      // Try flat: features/{feature}/locales/{locale}/{ns}.json
      const flatPath = path.join(featuresDir, entry.name, 'locales', locale, `${ns}.json`);
      try {
        const content = await fs.readFile(flatPath, 'utf-8');
        return JSON.parse(content);
      } catch {}

      // Try nested: features/{group}/{sub}/locales/{locale}/{ns}.json (Admin, MAIN, etc.)
      const groupDir = path.join(featuresDir, entry.name);
      try {
        const subEntries = await fs.readdir(groupDir, { withFileTypes: true });
        for (const sub of subEntries) {
          if (!sub.isDirectory()) continue;
          const nestedPath = path.join(groupDir, sub.name, 'locales', locale, `${ns}.json`);
          try {
            const content = await fs.readFile(nestedPath, 'utf-8');
            return JSON.parse(content);
          } catch {}
        }
      } catch {}
    }
  } catch {}

  return {};
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
    messages,
    timeZone: 'Asia/Riyadh'
  };
});
