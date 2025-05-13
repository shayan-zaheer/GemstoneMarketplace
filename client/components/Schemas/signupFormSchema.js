import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  residenceAddress: z.string().min(5, "Invalid residence address"),
  contact: z.string().min(10, "Invalid contact number"),
  cnic: z.string().length(13, "CNIC must be exactly 13 digits"),
  walletAddress: z.string()
    .length(42, "Wallet address must be exactly 42 characters")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid wallet address format"),
});