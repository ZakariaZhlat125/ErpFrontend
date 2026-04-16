// components/form/FormField.tsx
"use client";

import React, { useId } from "react";
import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { Input, InputNumber, Checkbox } from "antd";
import type { InputProps } from "antd";
import type { TextAreaProps } from "antd/es/input";
import type { InputNumberProps } from "antd";
import type { CheckboxProps } from "antd";
import { cn } from "@/lib/utils/cn";

type BaseProps<TFV extends FieldValues> = {
    control: Control<TFV>;
    name: FieldPath<TFV>;
    label?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
    containerClassName?: string;

    /** error message passed from formState.errors[name]?.message */
    error?: string;
};

type TextLike = {
    type: "text" | "email" | "password";
    inputProps?: Omit<InputProps, "value" | "onChange" | "status" | "type">;
};

type TextAreaLike = {
    type: "textarea";
    textAreaProps?: Omit<TextAreaProps, "value" | "onChange" | "status">;
};

type NumberLike = {
    type: "number";
    numberProps?: Omit<InputNumberProps, "value" | "onChange" | "status">;
};

type CheckboxLike = {
    type: "checkbox";
    checkboxProps?: Omit<CheckboxProps, "checked" | "onChange">;
};

export type FormFieldProps<TFV extends FieldValues> =
    BaseProps<TFV> & (TextLike | TextAreaLike | NumberLike | CheckboxLike);

const TOKENS = {
    brand: "#0B6B57",
    ring: "rgba(11,107,87,0.18)",
    border: "rgb(229 231 235)", // gray-200
    errorBorder: "rgb(248 113 113)", // red-400
    errorRing: "rgba(248,113,113,0.18)",
} as const;

export function FormField<TFV extends FieldValues>(props: FormFieldProps<TFV>) {
    const {
        control,
        name,
        label,
        hint,
        required,
        disabled,
        error,
        className,
        containerClassName,
    } = props;

    const autoId = useId();
    const fieldId = `${name}-${autoId}`;
    const hintId = hint ? `${fieldId}-hint` : undefined;
    const errorId = error ? `${fieldId}-error` : undefined;
    const describedBy = [errorId, hintId].filter(Boolean).join(" ") || undefined;

    const wrapperClass = cn(
        "rounded-xl border bg-white transition",
        disabled ? "bg-gray-50 opacity-75" : "bg-white",
        error
            ? "border-red-400 focus-within:ring-2 focus-within:ring-[rgba(248,113,113,0.18)]"
            : "border-gray-200 focus-within:ring-2 focus-within:ring-[rgba(11,107,87,0.18)] focus-within:border-[rgba(11,107,87,0.7)]"
    );

    return (
        <div className={cn("w-full", containerClassName)}>
            {label ? (
                <label
                    htmlFor={fieldId}
                    className={cn("mb-1.5 block text-sm font-medium text-gray-800")}
                >
                    {label} {required ? <span className="text-red-500">*</span> : null}
                </label>
            ) : null}

            <Controller
                control={control}
                name={name}
                render={({ field }) => {
                    // Checkbox
                    if (props.type === "checkbox") {
                        return (
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={fieldId}
                                    disabled={disabled}
                                    checked={!!field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                    {...props.checkboxProps}
                                />
                                {props.checkboxProps?.children ? null : (
                                    <span className="text-sm text-gray-700">{hint}</span>
                                )}
                            </div>
                        );
                    }

                    // Textarea
                    if (props.type === "textarea") {
                        return (
                            <div className={wrapperClass}>
                                <Input.TextArea
                                    id={fieldId}
                                    disabled={disabled}
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    onBlur={field.onBlur}
                                    aria-invalid={!!error}
                                    aria-describedby={describedBy}
                                    className={cn("border-0! shadow-none! outline-none! px-3 py-2 text-[14px]", className)}
                                    autoSize={{ minRows: 4, maxRows: 8 }}
                                    {...props.textAreaProps}
                                />
                            </div>
                        );
                    }

                    // Number
                    if (props.type === "number") {
                        return (
                            <div className={wrapperClass}>
                                <InputNumber
                                    id={fieldId}
                                    disabled={disabled}
                                    value={field.value}
                                    onChange={(val) => field.onChange(val)}
                                    onBlur={field.onBlur}
                                    aria-invalid={!!error}
                                    aria-describedby={describedBy}
                                    className={cn("w-full! border-0! shadow-none! outline-none!", className)}
                                    // padding for antd number input
                                    style={{ padding: "0 12px", height: 44 }}
                                    {...props.numberProps}
                                />
                            </div>
                        );
                    }

                    // text/email/password
                    return (
                        <div className={wrapperClass}>
                            <Input
                                id={fieldId}
                                disabled={disabled}
                                value={field.value ?? ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                onBlur={field.onBlur}
                                type={props.type}
                                aria-invalid={!!error}
                                aria-describedby={describedBy}
                                className={cn("h-11 border-0! shadow-none! outline-none! px-3 text-[14px]", className)}
                                style={{ caretColor: TOKENS.brand }}
                                {...props.inputProps}
                            />
                        </div>
                    );
                }}
            />

            {error ? (
                <p id={errorId} className="mt-1.5 text-xs text-red-600">
                    {error}
                </p>
            ) : hint && props.type !== "checkbox" ? (
                <p id={hintId} className="mt-1.5 text-xs text-gray-500">
                    {hint}
                </p>
            ) : null}
        </div>
    );
}
