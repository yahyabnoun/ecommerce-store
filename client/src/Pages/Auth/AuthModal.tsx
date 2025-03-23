import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react'; // Import X icon from lucide-react
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { obtainTokens, registerUser } from '@/api/Auth';
import { showToast } from '@/components/ShowToast';
import { AxiosError } from 'axios';
import { Form } from '@/components/ui/form';
import CustomInputField from '@/components/ui/form-fields/text-form-input-field';
import PasswordInputWithLabelField from '@/components/password-inputs';
import { DevTool } from "@hookform/devtools";


interface AuthModalProps {
  show: boolean;
  onClose: () => void;
}

const loginValidator = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

const registerValidator = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(1, { message: 'Username is required' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
  confirmPassword: z.string().min(1, { message: 'Confirm Password is required' }),
  first_name: z.string().min(1, { message: 'First Name is required' }),
  last_name: z.string().min(1, { message: 'Last Name is required' }),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
);

type LoginValues = z.infer<typeof loginValidator>;
type RegisterValues = z.infer<typeof registerValidator>;

const AuthModal = ({ show, onClose }: AuthModalProps) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const { afterSuccessfullLogin } = useAuth();

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login-user"],
    mutationFn: obtainTokens,
    onSuccess: (response) => {
      const data = response.data;
      afterSuccessfullLogin(data.tokens, data.user);
      showToast("success", "Login successful");
      onClose();
    },
    onError: (error) => {
      if (!(error instanceof AxiosError)) {
        showToast("error", "Something went wrong");
        return;
      }
      showToast("error", "Invalid credentials. Please try again");
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["register-user"],
    mutationFn: registerUser,
    onSuccess: (response) => {
      const data = response.data;
      afterSuccessfullLogin(data.tokens, data.user);
      showToast("success", "Registration successful");
      onClose();
    },
    onError: (error) => {
      if (!(error instanceof AxiosError)) {
        showToast("error", "Something went wrong");
        return;
      }
      const errorMessage = error?.response?.data?.detail || "Registration failed";
      showToast("error", errorMessage);
    },
  });

  const handleLoginSubmit = (data: LoginValues) => {
    loginMutation.mutate(data);
  };

  const handleRegisterSubmit = (data: RegisterValues) => {
    registerMutation.mutate(data);
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop that closes modal on click */}
          <motion.div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            transition={{ duration: 0.2 }}
          />

          {/* Modal content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div
              className="bg-background rounded-xl p-8 w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Toggle buttons and Close button */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={isSignIn ? 'default' : 'outline'}
                  className="w-[45%] flex-1"
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </Button>
                <Button
                  variant={!isSignIn ? 'default' : 'outline'}
                  className="w-[45%] flex-1"
                  onClick={() => setIsSignIn(false)}
                >
                  Sign Up
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-[10%] border border-gray-300"
                  onClick={onClose}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {isSignIn ? (
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                    <CustomInputField
                      fieldName="username"
                      label="Username or Email"
                      control={loginForm.control}
                    />
                    <PasswordInputWithLabelField
                      labelNode={<span>Password</span>}
                      control={loginForm.control}
                      fieldName="password"
                      label="Password"
                    />
                    <Button 
                      type="submit" 
                      className="w-full mt-4" 
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? "Loading..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              ) : (
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} className="space-y-4">
                    <CustomInputField
                      fieldName="username"
                      label="Username"
                      control={registerForm.control}
                    />
                    <CustomInputField
                      fieldName="email"
                      label="Email"
                      control={registerForm.control}
                    />
                    <PasswordInputWithLabelField
                      labelNode={<span>Password</span>}
                      control={registerForm.control}
                      fieldName="password"
                      label="Password"
                    />
                    <PasswordInputWithLabelField
                      labelNode={<span>Confirm Password</span>}
                      control={registerForm.control}
                      fieldName="confirmPassword"
                      label="Confirm Password"
                    />
                    <CustomInputField
                      fieldName="first_name"
                      label="First Name"
                      control={registerForm.control}
                    />
                    <CustomInputField
                      fieldName="last_name"
                      label="Last Name"
                      control={registerForm.control}
                    />
                    <DevTool control={registerForm.control}/>
                    <Button 
                      type="submit" 
                      className="w-full mt-4" 
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending ? "Loading..." : "Sign Up"}
                    </Button>
                  </form>
                </Form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;