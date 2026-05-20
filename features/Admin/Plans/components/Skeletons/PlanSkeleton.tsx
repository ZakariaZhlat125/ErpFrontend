import { Card } from '@/components/ui/Card';

export function PlanSkeleton() {
  return (
    <div className="min-h-screen p-3 md:p-4 bg-background">
      {/* Header Skeleton */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="h-7 w-64 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#ececf2]">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <th key={i} className="text-left py-3 px-2">
                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((row) => (
                <tr key={row} className="border-b border-[#ececf2]">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
                    <td key={col} className="py-4 px-2">
                      <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
