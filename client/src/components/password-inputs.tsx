/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from "clsx";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { InputFieldProps } from "./ui/form-fields/text-form-input-field";

type PasswordInputWithLabelFieldProps<T extends Record<string, any>> =
    InputFieldProps<T> & {
        labelNode: React.ReactNode;
    };

const PasswordInputWithLabelField = <T extends Record<string, any>>(
    props: PasswordInputWithLabelFieldProps<T>
) => {
    const { label, control, fieldName, labelNode, description } = props;
    return (
        <FormField
            control={control}
            name={fieldName as any}
            render={({ field, fieldState }) => (
                <FormItem className={props.parentClassName}>
                    {labelNode ? labelNode : <FormLabel>{label}</FormLabel>}

                    <FormControl>
                        <Input
                            type={"password"}
                            className={clsx(props.inputClassName, {
                                "border-red-500 ring-red-400 outline-red-600":
                                    fieldState.error,
                            })}
                            {...field}
                            name={fieldName as any}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const PasswordInputField = <T extends Record<string, any>>(
    props: InputFieldProps<T>
) => {
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
                            type={"password"}
                            className={clsx(props.inputClassName, {
                                "border-red-500 ring-red-400 outline-red-600":
                                    fieldState.error,
                            })}
                            {...field}
                            name={fieldName as any}
                        />
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default PasswordInputWithLabelField;
