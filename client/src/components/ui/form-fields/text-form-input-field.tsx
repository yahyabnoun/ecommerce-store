/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC } from "react";
import { Control, FieldValue, FieldValues } from "react-hook-form";
import clsx from "clsx";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../form";
import { Input } from "../input";


export type InputFieldProps<T extends Record<string, any>> =
    React.InputHTMLAttributes<HTMLInputElement> & {
        label: string;
        fieldName: keyof T;

        control: Control<T, any>;
        description?: string;
        parentClassName?: string;
        inputClassName?: string;
        handleBlankAsNull?: boolean;
    };

const CustomInputField = <T extends FieldValues>(props: InputFieldProps<T>) => {
    const { label, control, fieldName, type, description } = props;
    return (
        <FormField
            control={control as any}
            name={fieldName as any}
            render={({ field, fieldState }) => (
                <FormItem className={props.parentClassName}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type ?? "text"}
                            className={clsx(props.inputClassName, {
                                "border-red-500 ring-red-400 outline-red-600":
                                    fieldState.error,
                            })}
                            {...field}
                            value={field.value || ""}
                            placeholder={props.placeholder}
                            onChange={(e) => {
                                if (props.handleBlankAsNull && e.target.value === "") {
                                    field.onChange(null);
                                } else {
                                    field.onChange(e.target.value);
                                    console.log(e.target.value);
                                }
                            }}
                            onBlur={field.onBlur}
                            // name={fieldName as any}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default CustomInputField;
