import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  className?: string;
}

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <Label 
            htmlFor={props.id} 
            className={cn(error && "text-destructive")}
          >
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {error && (
          <p className="text-sm font-medium text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

interface FormInputFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  description?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function FormInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  description,
  placeholder,
  type = "text",
  className,
}: FormInputFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              className={className}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          {fieldState.error && (
            <FormMessage>{fieldState.error.message}</FormMessage>
          )}
        </FormItem>
      )}
    />
  );
}