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
import { UserPlus } from "lucide-react";

const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export function Register() {
  const { register, isLoading, error, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    await register(data.name, data.email, data.password);
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-2">
          <UserPlus className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to create an account
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
              name="name"
              label="Name"
              placeholder="Enter your full name"
            />
            
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
              placeholder="Create a password"
              type={showPassword ? "text" : "password"}
            />
            
            <FormInputField
              control={form.control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
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
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <Loader size="sm" className="mr-2" /> : null}
              Create Account
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}