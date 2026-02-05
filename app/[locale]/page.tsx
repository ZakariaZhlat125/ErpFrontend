// app/[locale]/page.tsx (Server Component افتراضيًا)

import { getTranslations } from "@/lib/i18n/getTranslations";


export default async function Page() {
  const  t  = await getTranslations([ 'home']); // defaults to "public"
  return <div>{t("title")}</div>;
}
