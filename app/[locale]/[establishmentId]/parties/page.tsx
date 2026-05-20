import { Parties } from "@/features/MAIN/Parties/Parties";
import { extractIdFromSlug } from "@/lib/utils/slug";

interface PartiesPageProps {
  params: Promise<{
    establishmentId: string;
  }>;
}

export default async function PartiesPage({ params }: PartiesPageProps) {
  const { establishmentId } = await params;
  const organizationId = extractIdFromSlug(establishmentId);
  
  if (!organizationId) {
    return <div>Invalid establishment ID: {establishmentId}</div>;
  }
  
  return <Parties organizationId={organizationId} />;
}
