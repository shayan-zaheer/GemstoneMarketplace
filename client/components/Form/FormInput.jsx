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
  handleFileChange,
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
                className="file:bg-primary file:text-white file:py-1 file:hover:bg-[#7c3aed]/80 file:rounded-md 
                         file:border-none border border-gray-500 text-gray-500 file:cursor-pointer file:mr-4 
                         px-1 "
                placeholder={placeholder}
                disabled={disabled}
                multiple={more}
                onChange={handleFileChange}
              />
            ) : (
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                style={{ border: "1px solid grey" }}
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
