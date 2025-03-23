import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Control } from "react-hook-form";
import { FormField, FormMessage } from "../ui/form";
import clsx from "clsx";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

interface Option {
    label: string;
    value: any;
    image?: string;
}

type ETF = Record<string, any>;

interface RadioGroupFormFieldProps<T extends ETF> {
    label: string;
    name: keyof T;
    options: Option[];
    control: Control<T, any>;
    disabled?: boolean;
    containerClassName?: string;
    disabledOptions?: string[];
    optionsClassNames?: string[];
}

export const CardRadioGroupField = <T extends ETF>(
    props: RadioGroupFormFieldProps<T>
) => {
    const {
        label,
        name,
        options,
        control,
        disabled = false,
        containerClassName,
        disabledOptions = [],
        optionsClassNames = [],
    } = props;

    return (
        <fieldset
            className={containerClassName}
            disabled={disabled}
        >
            <legend className="text-sm font-semibold leading-6 text-gray-900">
                {label}
            </legend>
            <FormField
                control={control}
                name={name as any}
                render={({ field }) => {
                    const currentValue = field.value;
                    return (
                        <>
                            <RadioGroup
                                value={currentValue}
                                onChange={(option) => {
                                    field.onChange(option);
                                }}
                                className={classNames(
                                    "mt-2 grid grid-cols-12 gap-y-6 gap-3",
                                    disabled ? "opacity-70 cursor-not-allowed" : ""
                                )}
                            >
                                {options.map((option, index) => (
                                    <Radio
                                        key={option.value}
                                        value={option.value}
                                        aria-label={option.label}
                                        disabled={disabledOptions.includes(option.value)}
                                        className={({ focus }) =>
                                            classNames(
                                                focus && !disabled
                                                    ? "border-orange-500 ring-2 ring-orangeborder-orange-500"
                                                    : "",
                                                !focus ? "border-gray-300" : "",
                                                "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none col-span-6",

                                                optionsClassNames[index],
                                                disabled ||
                                                    disabledOptions.includes(option.value)
                                                    ? "opacity-70 cursor-not-allowed"
                                                    : ""
                                            )
                                        }
                                    >
                                        {({ checked, focus }) => (
                                            <>
                                                <div className="flex flex-col w-full justify-center">
                                                    <div className="flex flex-row justify-between">
                                                        <span className="block font-medium text-gray-900 mb-5">
                                                            {option.label}
                                                        </span>
                                                        <CheckCircleIcon
                                                            className={classNames(
                                                                !checked
                                                                    ? "invisible"
                                                                    : "",
                                                                "h-5 w-5 text-orange-500"
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                    </div>

                                                    <div className="flex justify-center">
                                                        <img
                                                            src={option.image}
                                                            className="w-16 h-16 "
                                                        />
                                                    </div>
                                                </div>

                                                <span
                                                    className={classNames(
                                                        checked
                                                            ? "border-orange-500"
                                                            : "border-transparent",
                                                        focus ? "border" : "border-2",
                                                        "pointer-events-none absolute -inset-px rounded-lg"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </Radio>
                                ))}
                            </RadioGroup>
                            <FormMessage />
                        </>
                    );
                }}
            />
        </fieldset>
    );
};

export default CardRadioGroupField;
