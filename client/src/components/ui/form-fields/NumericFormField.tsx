import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "../ui/input";
import { countDecimals } from "@/utils/mathHelper";

type FormInputProps = {
    name: string;
    label?: string;
    placeholder?: string;
    type: "number" | "positive_integer" | "leading_positive_number";
    className?: string;
    containerClassName?: string;
    disabled?: boolean;
    hidden?: boolean;
    value?: number;
    onChange?: () => void;
    numberOfFixedDecimalPoints?: number;
    leading?: string;
    leadingClasses?: string;
};

const NumericFormField = ({
    name,
    label,
    placeholder,
    type,
    className = "",
    containerClassName,
    disabled = false,
    hidden = false,
    value,
    onChange,
    numberOfFixedDecimalPoints = 2,
    leading,
    leadingClasses,
}: FormInputProps) => {
    const { control } = useFormContext();

    const onKeyDownHandleFixedPointNumbers = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        const num: number | undefined = e.currentTarget.valueAsNumber;

        if (e.key) return;

        if (num && countDecimals(num) >= numberOfFixedDecimalPoints) {
            e.preventDefault();
        }
    };

    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) => (
                <FormItem className={containerClassName}>
                    {!hidden && label && <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        {type === "number" ? (
                            <Input
                                {...field}
                                placeholder={placeholder}
                                className={`${className}`}
                                type={hidden ? "hidden" : "number"}
                                disabled={disabled}
                                {...(!value || isNaN(value) ? {} : { value: value })}
                                {...(onChange ? { onChange: onChange } : {})}
                                {...(numberOfFixedDecimalPoints
                                    ? {
                                          onKeyDown: (e) =>
                                              onKeyDownHandleFixedPointNumbers(e),
                                      }
                                    : {})}
                            />
                        ) : type === "positive_integer" ? (
                            <Input
                                {...field}
                                placeholder={placeholder}
                                className={`${className}`}
                                type={hidden ? "hidden" : "number"}
                                onKeyDown={(e) => {
                                    if (e.key === "." || e.key === ",") {
                                        e.preventDefault();
                                    }
                                }}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    target.value = target.value.replace(/\D/g, "");
                                }}
                                disabled={disabled}
                                {...(!value || isNaN(value) ? {} : { value: value })} // Conditionally adding the value prop
                                {...(onChange ? { onChange: onChange } : {})} // Conditionally adding the value prop
                            />
                        ) : type === "leading_positive_number" ? (
                            <div className="flex">
                                <div
                                    className={`flex min-w-fit  items-center justify-center px-3 border border-r-0 rounded-l-md bg-muted text-muted-foreground text-sm ${leadingClasses}`}
                                >
                                    {leading}
                                </div>
                                <Input
                                    {...field}
                                    placeholder={placeholder}
                                    className={`rounded-l-none ${className}`}
                                    type={hidden ? "hidden" : "number"}
                                    onKeyDown={(e) => {
                                        if (e.key === "." || e.key === ",") {
                                            e.preventDefault();
                                        }
                                    }}
                                    onInput={(e) => {
                                        const target = e.target as HTMLInputElement;
                                        target.value = target.value.replace(/\D/g, "");
                                    }}
                                    disabled={disabled}
                                    {...(!value || isNaN(value) ? {} : { value: value })} // Conditionally adding the value prop
                                    {...(onChange ? { onChange: onChange } : {})} // Conditionally adding the value prop
                                />
                            </div>
                        ) : null}
                    </FormControl>
                    {hidden || <FormMessage />}
                </FormItem>
            )}
        />
    );
};

export default NumericFormField;
