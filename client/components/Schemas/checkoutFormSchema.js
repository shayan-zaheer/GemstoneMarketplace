import { z } from "zod";

export const checkoutFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  phone: z.string().regex(/^03\d{9}$/, { message: "Phone number must start with 03 and be 11 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  address: z.string().min(10, { message: "Address must be at least 10 characters long" }),
  city: z.string().min(3, { message: "City must be at least 3 characters long" }),
  country: z.string().min(3, { message: "Country must be at least 3 characters long" }),
  postCode: z.string().regex(/^\d{5}$/, { message: "Postal code must be 5 digits long" }).optional(),
  paymentMethod: z.enum(["cash", "paypro"], "Select a payment method"),
})

