import { Image, XCircleIcon } from "lucide-react";
import React from "react";
import { FormField, FormMessage } from "../ui/form";
import { Control } from "react-hook-form";
import clsx from "clsx";
import { Button } from "../ui/button";
import { toast } from "sonner";

export type MultipleImageUploadProps<T extends Record<string, any>> = {
    label: string;
    fieldName: keyof T;
    control: Control<T, any>;
    description?: string;
    placeholder?: string;
    max_images: number;
    max_size_in_mb: number;
    allowed_extensions: string[];
    galleryContainerClassName?: string;
    containerClassName?: string;
    subItemClassName?: string;
};

export type SingleImageUploadFormItemProps<T extends Record<string, any>> = {
    hideDetails?: boolean;
    label: string;
    fieldName: keyof T;
    control: Control<T, any>;
    description?: string;
    placeholder?: string;
    max_size_in_mb: number;
    allowed_extensions: string[];
    galleryContainerClassName?: string;
    containerClassName?: string;
    subItemClassName?: string;
};

type MultiImageFieldValue = {
    id: number;
    value: File | string;
};
export const MultiImageUploadFormItem = <T extends Record<string, any>>(
    props: MultipleImageUploadProps<T>
) => {
    const {
        label,
        control,
        fieldName,
        description,
        allowed_extensions,
        max_size_in_mb,
        containerClassName,
        subItemClassName,
    } = props;
    const [isDragActive, setIsDragActive] = React.useState(false);

    return (
        <FormField
            control={control as any}
            name={fieldName as any}
            render={({ field }) => {
                // console.log(
                //     {
                //         [fieldName]: field.value
                //     }
                // );
                // console.log({ value: field.value });

                const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!e?.target?.files) {
                        return;
                    }
                    addFile(e.target.files);
                };

                const onFileRemove = (fileId: number) => {
                    field.onChange(
                        field.value?.filter(
                            (file: MultiImageFieldValue) => file.id !== fileId
                        )
                    );
                };
                const addFile = (uploadedFiles: FileList) => {
                    if (!uploadedFiles) return;
                    if (uploadedFiles.length === 0) {
                        return;
                    }
                    const uploadedFile = uploadedFiles[0];
                    if (!allowed_extensions.includes(uploadedFile.type)) {
                        alert(`Only ${allowed_extensions.join(", ")} are allowed`);
                        return;
                    }
                    if (uploadedFile.size > max_size_in_mb * 1024 * 1024) {
                        alert(`File size should be less than ${max_size_in_mb}MB`);
                        return;
                    }
                    if (field.value && field.value.length >= props.max_images) {
                        alert(`You can only upload ${props.max_images} images`);
                        return;
                    }

                    let generateId = -1 * Date.now();
                    while (
                        field.value?.find(
                            (file: MultiImageFieldValue) => file.id === generateId
                        )
                    ) {
                        generateId = -1 * Date.now();
                    }
                    console.log({ uploadedFile, oldValue: field.value });
                    field.onChange([
                        ...(field.value || []),
                        { value: uploadedFile, id: generateId },
                    ]);
                };

                const onDragFileEnter = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragActive(true);
                };

                const onDragFileLeave = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDragActive(false);
                };

                const onDropFile = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const files = e.dataTransfer.files;
                    addFile(files);
                    setIsDragActive(false);
                };

                return (
                    <div className={clsx(containerClassName)}>
                        <div className="col-span-12">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm font-medium mb-5 leading-6 text-gray-900"
                            >
                                {label}
                            </label>
                            <div
                                className={clsx(
                                    "grid grid-cols-12 w-full  gap-x-2 gap-y-2",
                                    props.galleryContainerClassName
                                )}
                            >
                                {!field.value ? (
                                    <div
                                        className={clsx(
                                            "flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                                            { "bg-gray-100": isDragActive },
                                            subItemClassName
                                        )}
                                        onDragLeave={onDragFileLeave}
                                        onDrop={onDropFile}
                                        onDragOver={onDragFileEnter}
                                    >
                                        <div className="text-center">
                                            <Image
                                                className="mx-auto h-12 w-12 text-gray-300"
                                                aria-hidden="true"
                                            />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor={fieldName as string}
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>{description}</span>
                                                    <input
                                                        id={fieldName as string}
                                                        name="file-upload"
                                                        type="file"
                                                        onChange={uploadFile}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                            <p className="text-xs leading-5 text-gray-600">
                                                {allowed_extensions.join(", ")} up to{" "}
                                                {max_size_in_mb}MB
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    field.value.map(
                                        (fieldValue: MultiImageFieldValue) => {
                                            return fieldValue.value instanceof File ? (
                                                <FileImagePreview
                                                    key={fieldValue.id}
                                                    // className='col-span-12  sm:col-span-6  aspect-[16/9]'
                                                    className={subItemClassName}
                                                    file={fieldValue.value}
                                                    onFileRemove={() =>
                                                        onFileRemove(fieldValue.id)
                                                    }
                                                />
                                            ) : (
                                                <UrlImagePreview
                                                    key={fieldValue.id}
                                                    className={subItemClassName}
                                                    // className='col-span-6 h-[200px]'
                                                    preview={fieldValue.value}
                                                    onFileRemove={() =>
                                                        onFileRemove(fieldValue.id)
                                                    }
                                                />
                                            );
                                        }
                                    )
                                )}
                                {field.value && field.value.length < props.max_images && (
                                    <div
                                        className={clsx(
                                            "flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                                            { "bg-gray-100": isDragActive },
                                            subItemClassName
                                        )}
                                        onDragLeave={onDragFileLeave}
                                        onDrop={onDropFile}
                                        onDragOver={onDragFileEnter}
                                    >
                                        <div className="text-center">
                                            <Image
                                                className="mx-auto h-12 w-12 text-gray-300"
                                                aria-hidden="true"
                                            />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor={fieldName as string}
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>{description}</span>
                                                    <input
                                                        id={fieldName as string}
                                                        name="file-upload"
                                                        type="file"
                                                        onChange={uploadFile}
                                                        className="sr-only"
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                            <p className="text-xs leading-5 text-gray-600">
                                                {allowed_extensions.join(", ")} up to{" "}
                                                {max_size_in_mb}MB
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <FormMessage className="mt-4" />
                        </div>
                    </div>
                );
            }}
        />
    );
};

export const SingleImageUploadFormItem = <T extends Record<string, any>>(
    props: SingleImageUploadFormItemProps<T>
) => {
    const {
        label,
        control,
        fieldName,
        description,
        allowed_extensions,
        max_size_in_mb,
        galleryContainerClassName,
        subItemClassName,
        containerClassName,
    } = props;
    const [isDragActive, setIsDragActive] = React.useState(false);
    return (
        <FormField
            control={control as any}
            name={fieldName as any}
            render={({ field }) => {
                // console.log(
                //     {
                //         [fieldName]: field.value
                //     }
                // );

                const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
                    // console.log("upload file");
                    // console.log(e);

                    if (!e?.target?.files) {
                        return;
                    }

                    addFile(e.target.files);
                };

                const onFileRemove = () => {
                    field.onChange(null);
                };
                const addFile = (uploadedFiles: FileList) => {
                    if (!uploadedFiles) {
                        return;
                    }

                    if (uploadedFiles.length === 0) {
                        return;
                    }

                    const uploadedFile = uploadedFiles[0];

                    if (!allowed_extensions.includes(uploadedFile.type)) {
                        toast.warning(`Only ${allowed_extensions.join(", ")} are allowed`);
                        return;
                    }
                    if (uploadedFile.size > max_size_in_mb * 1024 * 1024) {
                        toast.warning(`File size should be less than ${max_size_in_mb}MB`);
                        return;
                    }

                    // console.log({ uploadedFile, oldValue: field.value });
                    field.onChange(uploadedFile);
                };

                const onDragFileEnter = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsDragActive(true);
                };

                const onDragFileLeave = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log("---------------------------------------");
                    // console.log("LEAVING ...");
                    setIsDragActive(false);
                };

                const onDropFile = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log("---------------------------------------");
                    // console.log("DROPPED ...");
                    const files = e.dataTransfer.files;
                    addFile(files);
                    setIsDragActive(false);
                };

                return (
                    <div className={clsx(containerClassName)}>
                        <div className="col-span-12">
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm font-medium mb-5 leading-6 text-gray-900"
                            >
                                {label}
                            </label>
                            {!field.value && (
                                <div
                                    className={clsx(
                                        "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                                        { "bg-gray-100": isDragActive },
                                        subItemClassName
                                    )}
                                    onDragLeave={onDragFileLeave}
                                    onDrop={onDropFile}
                                    onDragOver={onDragFileEnter}
                                >
                                    <div className="text-center">
                                        <Image
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor={fieldName as string}
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{description}</span>
                                                <input
                                                    id={fieldName as string}
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={uploadFile}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">ou déposez ici</p>
                                        </div>
                                        {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                        <p className="text-xs leading-5 text-gray-600">
                                            {allowed_extensions
                                                .map((e) => e.split("/")[1])
                                                .join(", ")}{" "}
                                            jusqu'à {max_size_in_mb}MB
                                        </p>
                                    </div>
                                </div>
                            )}
                            {field.value && field.value instanceof File && (
                                <FileImagePreview
                                    className={clsx(
                                        subItemClassName,
                                        "border-2 border-dashed border-gray-400 rounded-lg p-5"
                                    )}
                                    file={field.value}
                                    onFileRemove={() => onFileRemove()}
                                />
                            )}
                            {typeof field.value === "string" && (
                                <UrlImagePreview
                                    className={clsx(
                                        subItemClassName,
                                        "border-2 border-dashed border-gray-400 rounded-lg p-5"
                                    )}
                                    preview={field.value}
                                    onFileRemove={() => onFileRemove()}
                                />
                            )}
                            <FormMessage className="mt-4" />
                        </div>
                    </div>
                );
            }}
        />
    );
};

export const SingleLogoImageUploadFormItem = <T extends Record<string, any>>(
    props: SingleImageUploadFormItemProps<T>
) => {
    const {
        label,
        control,
        fieldName,
        description,
        allowed_extensions,
        max_size_in_mb,
        galleryContainerClassName,
        hideDetails,
        subItemClassName,
        containerClassName,
    } = props;
    const [isDragActive, setIsDragActive] = React.useState(false);
    return (
        <FormField
            control={control as any}
            name={fieldName as any}
            render={({ field }) => {
                // console.log(
                //     {
                //         [fieldName]: field.value
                //     }
                // );

                const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
                    // console.log("upload file");
                    // console.log(e);

                    if (!e?.target?.files) {
                        return;
                    }

                    addFile(e.target.files);
                };

                const onFileRemove = () => {
                    field.onChange(null);
                };
                const addFile = (uploadedFiles: FileList) => {
                    if (!uploadedFiles) {
                        return;
                    }

                    if (uploadedFiles.length === 0) {
                        return;
                    }

                    const uploadedFile = uploadedFiles[0];

                    if (!allowed_extensions.includes(uploadedFile.type)) {
                        alert(`Only ${allowed_extensions.join(", ")} are allowed`);
                        return;
                    }
                    if (uploadedFile.size > max_size_in_mb * 1024 * 1024) {
                        alert(`File size should be less than ${max_size_in_mb}MB`);
                        return;
                    }

                    // console.log({ uploadedFile, oldValue: field.value });
                    field.onChange(uploadedFile);
                };

                const onDragFileEnter = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setIsDragActive(true);
                };

                const onDragFileLeave = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log("---------------------------------------");
                    // console.log("LEAVING ...");
                    setIsDragActive(false);
                };

                const onDropFile = (
                    e: React.DragEvent<HTMLDivElement | HTMLFormElement>
                ) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // console.log("---------------------------------------");
                    // console.log("DROPPED ...");
                    const files = e.dataTransfer.files;
                    addFile(files);
                    setIsDragActive(false);
                };

                return (
                    <div className={clsx(containerClassName)}>
                        <div className={clsx("col-span-12", galleryContainerClassName)}>
                            <label
                                htmlFor="cover-photo"
                                className="block text-sm font-medium mb-5 leading-6 text-gray-900"
                            >
                                {label}
                            </label>
                            {!field.value && (
                                <div
                                    className={clsx(
                                        "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                                        { "bg-gray-100": isDragActive },
                                        subItemClassName
                                    )}
                                    onDragLeave={onDragFileLeave}
                                    onDrop={onDropFile}
                                    onDragOver={onDragFileEnter}
                                >
                                    <div className="text-center">
                                        <Image
                                            className="mx-auto h-12 w-12 text-gray-300"
                                            aria-hidden="true"
                                        />
                                        <div className="mt-4 flex flex-col text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor={fieldName as string}
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>{description}</span>
                                                <input
                                                    id={fieldName as string}
                                                    name="file-upload"
                                                    type="file"
                                                    onChange={uploadFile}
                                                    className="sr-only"
                                                />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        {/* <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p> */}
                                        {hideDetails ? null : (
                                            <p className="text-xs leading-5 text-gray-600">
                                                <span className="flex flex-wrap space-x-3 ">
                                                    {allowed_extensions.map(
                                                        (extension) => (
                                                            <span key={extension}>
                                                                {extension}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                                up to {max_size_in_mb}MB
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            {field.value && field.value instanceof File && (
                                <FileImagePreview
                                    className={subItemClassName}
                                    isLogoPreview
                                    file={field.value}
                                    onFileRemove={() => onFileRemove()}
                                />
                            )}
                            {typeof field.value === "string" && (
                                <UrlImagePreview
                                    className={subItemClassName}
                                    preview={field.value}
                                    isLogoPreview
                                    onFileRemove={() => onFileRemove()}
                                />
                            )}
                        </div>

                        <FormMessage className="mt-4" />
                    </div>
                );
            }}
        />
    );
};

const UrlImagePreview = (props: {
    id?: number;
    preview: string;
    isLogoPreview?: boolean;
    className?: string;
    onFileRemove: () => void;
}) => {
    const { preview } = props;

    // console.log(props.isLogoPreview);

    return (
        <div className={clsx("relative group rounded-lg border-2", props.className)}>
            <img
                src={preview}
                className="object-contain h-full w-full"
            />
            {!props.isLogoPreview && (
                <button
                    type="button"
                    className="absolute top-0 right-0 -translate-y-[50%] translate-x-[50%] z-[10] p-1 bg-red-500 text-white rounded-full"
                    onClick={() => {
                        props.onFileRemove();
                    }}
                >
                    <XCircleIcon />
                </button>
            )}

            {props.isLogoPreview && (
                <div className="absolute bottom-0 flex items-center justify-center h-1/3 w-full bg-red-500/50  py-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <Button
                        type="button"
                        size={"sm"}
                        onClick={() => props.onFileRemove()}
                    >
                        Remove
                    </Button>
                </div>
            )}
            {/* <div className=' mt-10 px-2 py-3'>
            <h1>
                <span className='font-bold'>
                    Size :
                </span>  {sizeInMb < 1 ? `${sizeInKb.toFixed(2)} KB` : `${sizeInMb.toFixed(2)} MB`}
            </h1>
            <h1>
                <span className='font-bold'>
                    Name :
                </span>
                {props.file.name}
            </h1>


        </div> */}
        </div>
    );
};

const FileImagePreview = (props: {
    id?: number;
    file: File;
    isLogoPreview?: boolean;
    className?: string;
    onFileRemove: () => void;
}) => {
    const [base64Url, setBase64Url] = React.useState<string | null>(null);
    const sizeInKb = props.file.size / 1024;
    React.useEffect(() => {
        const url = URL.createObjectURL(props.file);
        setBase64Url(url);

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [props.file]);

    return (
        <div className={clsx("relative group", props.className)}>
            <img
                src={base64Url?.toString()}
                className="object-contain h-full w-full "
            />
            {!props.isLogoPreview && (
                <button
                    type="button"
                    className="absolute top-0 right-0 -translate-y-[50%] translate-x-[50%] z-[10] p-1 bg-red-500 text-white rounded-full"
                    onClick={() => {
                        // console.log("delete");
                        props.onFileRemove();
                    }}
                >
                    <XCircleIcon />
                </button>
            )}
            {props.isLogoPreview && (
                <div className="absolute bottom-0 flex items-center justify-center h-1/3 w-full bg-red-500/50  py-4 translate-y-full group-hover:translate-y-0 transition-transform">
                    <Button
                        type="button"
                        size={"sm"}
                        onClick={() => props.onFileRemove()}
                    >
                        Remove
                    </Button>
                </div>
            )}
            {/* <div className=' mt-10 px-2 py-3'>
            <h1>
                <span className='font-bold'>
                    Size :
                </span>  {sizeInMb < 1 ? `${sizeInKb.toFixed(2)} KB` : `${sizeInMb.toFixed(2)} MB`}
            </h1>
            <h1>
                <span className='font-bold'>
                    Name :
                </span>
                {props.file.name}
            </h1>


        </div> */}
        </div>
    );
};
