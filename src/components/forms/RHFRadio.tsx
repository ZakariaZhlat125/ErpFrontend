"use client";

import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupProps } from "@/components/ui/RadioGroup";

export type RHFRadioProps = {
  methods: UseFormReturn<any>;
  name: string;
} & Omit<RadioGroupProps, "value" | "onChange">;

export function RHFRadio({ methods, name, ...props }: RHFRadioProps) {
  const {
    control,
    formState: { errors },
  } = methods;

  const fieldError = (errors as any)?.[name];

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          {...props}
          value={field.value}
          onChange={field.onChange}
          error={!!fieldError}
          errorText={fieldError?.message as string | undefined}
        />
      )}
    />
  );
}
