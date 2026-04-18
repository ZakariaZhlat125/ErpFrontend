// proxy.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always' // يخلي الروابط دائمًا /en و /ar
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
