import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

export interface OptionType {
    label: string;
    value: string;
}

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: OptionType[];
  className?: string;
  disabled?: boolean;
};

const RadioGroupFormField = ({ name, label, options, disabled }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              {...field}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              className="flex mt-3"
            >
              {options.map((option) => {
                return (
                  <div
                    className="flex items-center space-x-2"
                    key={option.value}
                  >
                    <RadioGroupItem value={option.value} id={option.value} disabled={disabled}/>
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RadioGroupFormField;
