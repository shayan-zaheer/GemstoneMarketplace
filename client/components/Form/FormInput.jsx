import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const FormInput = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  more = false,
  handleFileChange
}) => {
  return (
    
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel style={{ fontSize: "16px" }}>{label}</FormLabel>
          <FormControl>
            {type == "file" ? (
              <Input
              // {...field}
              type="file"
              className="file:bg-primary 
                         file:text-white file:font-semibold file:h-full file:px-4 file:rounded-md 
                         file:border-none file:cursor-pointer file:mr-4 
                         px-1 border rounded-lg bg-transparent text-sm"
              placeholder={placeholder}
              disabled={disabled}
              multiple = {more}
              onChange = {handleFileChange}

            />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
