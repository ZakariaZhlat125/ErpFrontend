'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/lib/theme/use-theme';

export function OrganizationSkeleton() {
  const { tokens } = useTheme();

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: tokens.background }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div
              className="h-9 w-64 rounded mb-2"
              style={{ backgroundColor: tokens.border }}
            />
            <div
              className="h-5 w-96 rounded"
              style={{ backgroundColor: tokens.border }}
            />
          </div>
          <div
            className="h-10 w-32 rounded"
            style={{ backgroundColor: tokens.border }}
          />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl"
                  style={{ backgroundColor: tokens.border }}
                />
                <div className="flex-1">
                  <div
                    className="h-4 w-32 rounded mb-2"
                    style={{ backgroundColor: tokens.border }}
                  />
                  <div
                    className="h-8 w-16 rounded"
                    style={{ backgroundColor: tokens.border }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Organizations Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-16 h-16 rounded-xl"
                  style={{ backgroundColor: tokens.border }}
                />
                <div
                  className="h-6 w-20 rounded-full"
                  style={{ backgroundColor: tokens.border }}
                />
              </div>

              <div
                className="h-6 w-3/4 rounded mb-1"
                style={{ backgroundColor: tokens.border }}
              />
              <div
                className="h-4 w-full rounded mb-4"
                style={{ backgroundColor: tokens.border }}
              />

              <div className="space-y-2 mb-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: tokens.border }}
                    />
                    <div
                      className="h-4 flex-1 rounded"
                      style={{ backgroundColor: tokens.border }}
                    />
                  </div>
                ))}
              </div>

              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: `1px solid ${tokens.border}` }}
              >
                <div className="flex gap-2">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: tokens.border }}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: tokens.border }}
                  />
                </div>
                <div
                  className="h-8 w-24 rounded"
                  style={{ backgroundColor: tokens.border }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
