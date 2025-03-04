import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FormInputField } from "@/components/FormInput";
import { Loader } from "@/components/Loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

const loginSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export function Login() {
  const { login, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <LogIn className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="email"
            />
            
            <FormInputField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="show-password"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="show-password" className="text-sm text-muted-foreground">
                Show password
              </label>
            </div>
            
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader size="sm" className="mr-2" /> : null}
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}