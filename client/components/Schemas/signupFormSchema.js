import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  residenceAddress: z.string().min(10, { message: "Address must be at least 10 characters long" }),
  contact: z.string().regex(/^03\d{9}$/, { message: "Phone number must start with 03 and be 11 characters long" }),
  profileImage: z
    .custom((file) => file instanceof File && file.type.startsWith("image/"), { message: "Invalid file type" }),
  cnic: z.string().regex(/^\d{13}$/, { message: "CNIC must be 13 digits long" }),
  walletAddress: z.string().min(42, { message: "Wallet address must be at least 42 characters long" }),
});
