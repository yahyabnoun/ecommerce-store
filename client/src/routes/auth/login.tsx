// import { Button } from "@/components/ui/button";
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { useMutation } from "@tanstack/react-query";
// import image from "../../../public/bota.png";
// import logo from "../../../public/Logo.png";
// import { AxiosError } from "axios";
// import { showToast } from "@/components/ShowToast";
// import { obtainTokens } from "@/api/Auth";
// import { useAuth } from "@/context/AuthContext";
// import CustomInputField from "@/components/ui/form-fields/text-form-input-field";
// import PasswordInputWithLabelField from "@/components/password-inputs";


// const loginValidator = z.object({
//     username: z.string(),
//     password: z.string()
//     .min(8, { message: 'Password must be at least 8 characters long' }),
// });

// type LoginValues = z.infer<typeof loginValidator>;

// export default function LoginPage() {
//     const { afterSuccessfullLogin } = useAuth();
//     const navigate = useNavigate();
//     const form = useForm<LoginValues>({
//         resolver: zodResolver(loginValidator),
//         defaultValues: {
//             username: "",
//             password: "",
//         },
//     });
//     const {
//         control,
//         handleSubmit,
//         formState: {},
//     } = form;

//     const mutation = useMutation({
//         mutationKey: ["login-user"],
//         mutationFn: obtainTokens,

//         onSuccess: (response) => {
//             const data = response.data;
//             const navigateTo = afterSuccessfullLogin(data.tokens, data.user);
//             navigate(navigateTo, {
//                 state: {
//                     email: data.user.email,
//                 },
//             });
//         },
//         onError: async (error) => {
//             if (!(error instanceof AxiosError)) {
//                 showToast("error", "Oups, quelque chose s'est mal passé")
//                 return;
//             }
//             const errorMessage = error?.response?.data.detail;
//             // if (errorMessage) {
//             //     showToast("warning", errorMessage)
//             // } else {
//                 showToast("error", "Identifiants erronés Réessayez")
//             // }
//         },
//     });

//     return (
//         <div className="flex h-screen w-full">
//             <div className="hidden w-1/2 bg-gray-100 lg:block">
//                 <img
//                     src={image}
//                     alt="Login visual"
//                     width={1080}
//                     height={1080}
//                     className="h-full w-full object-cover"
//                 />
//             </div>
//             <div className="flex w-full items-center justify-center px-4 lg:w-1/2 flex-col">
//                 <div className="mb-4">
//                     <img
//                         src={logo}
//                         alt="logo"
//                         width={350}
//                         height={350}
//                         className={"relative left-5"}
//                     />
//                 </div>
//                 <Card className="w-full max-w-lg">
//                     <CardHeader>
//                         <CardTitle className="text-2xl">Se connecter</CardTitle>
//                         <CardDescription>
//                             Entrez votre email ci-dessous pour vous connecter à votre
//                             compte
//                         </CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <Form {...form}>
//                             <form
//                                 noValidate
//                                 onSubmit={handleSubmit((data) => mutation.mutate(data))}
//                             >
//                                 <div className="grid gap-4">
//                                     <div className="grid gap-2">
//                                         <CustomInputField
//                                             fieldName="username"
//                                             label="Nom d'utilisateur ou e-mail"
//                                             control={control}
//                                         />
//                                         <PasswordInputWithLabelField
//                                             control={control}
//                                             labelNode={
//                                                 <div className="flex items-center">
//                                                     <Label htmlFor="password">
//                                                         Mot de passe
//                                                     </Label>
//                                                     <Link
//                                                         to="/forgot-password"
//                                                         className="ml-auto inline-block text-sm underline"
//                                                     >
//                                                         Mot de passe oublié ?
//                                                     </Link>
//                                                 </div>
//                                             }
//                                             fieldName="password"
//                                             label="Password"
//                                         />
//                                     </div>

//                                     <Button
//                                         type="submit"
//                                         disabled={mutation.isPending}
//                                         className="w-full"
//                                     >
//                                         {mutation.isPending
//                                             ? "Chargement..."
//                                             : "Se connecter"}
//                                     </Button>
//                                 </div>
//                             </form>
//                         </Form>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }
