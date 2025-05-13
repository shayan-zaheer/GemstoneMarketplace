import { z } from "zod";

export const uploadGemSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Gemstone name is required" })
    .max(50, { message: "Gemstone name must be less than 50 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description must be less than 500 characters" }),
  shape: z
    .string()
    .min(1, { message: "Shape is required" })
    .max(50, { message: "Shape must be less than 50 characters" }),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Price must be a number" }),
  purity: z.string().min(1, { message: "Purity is required" }),
  weight: z
    .string()
    .min(1, { message: "Weight is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Weight must be a number" }),
  image: z
    .any()
    .refine((file) => file && file.length > 0, {
      message: "Gem Profile image is required",
    })
    .refine((file) => file[0]?.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        return file && allowedTypes.includes(file[0]?.type);
      },
      {
        message: "Only .png or .jpg files are allowed",
      }
    ),
  coverImage: z
    .any()
    .refine((file) => file && file.length > 0, {
      message: "Gem Cover image is required",
    })
    .refine((file) => file[0]?.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        return file && allowedTypes.includes(file[0]?.type);
      },
      {
        message: "Only .png or .jpg files are allowed",
      }
    ),
  moreImages: z
    .any()
    .refine((files) => files && files.length >= 2 && files.length <= 6, {
      message: "Select between 2 and 6 images",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) => file?.size <= 2 * 1024 * 1024),
      {
        message: "File size must be less than 2MB",
      }
    )
    .refine(
      (files) => {
        const allowedTypes = ["image/jpeg", "image/png"];
        return Array.from(files).every((file) =>
          allowedTypes.includes(file?.type)
        );
      },
      {
        message: "Only .png or .jpg files are allowed",
      }
    ),
  dimensions: z
    .string()
    .min(1, { message: "Dimensions are required" })
    .regex(/^\d+\s*x\s*\d+\s*x\s*\d+$/, {
      message: "Dimensions must be in the form of 'a x b x c'",
    }),
});
