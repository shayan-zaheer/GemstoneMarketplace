import { z } from "zod";

export const uploadGemSchema2 = z.object({
  certificate: z
    .any()
    .refine((file) => file && file?.length > 0, {
      message: "Certificate is required",
    })
    .refine((file) => file[0]?.size <= 2 * 1024 * 1024, {
      message: "File size must be less than 2MB",
    })
    .refine(
      (file) => {
        const allowedTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];
        return file && allowedTypes.includes(file[0]?.type);
      },
      {
        message: "Only pdf and docx files are allowed",
      }
    ),
  transactionHash: z
    .string()
    .min(1, { message: "Transaction Hash is required" }),
  category: z.string().min(1, { message: "Gem Category is required" }),
});
