import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const FormInput = ({ control, name, label, placeholder, type = "text", disabled = false}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel style={{ fontSize: "16px" }}>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} placeholder={placeholder} disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
