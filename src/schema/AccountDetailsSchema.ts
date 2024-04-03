import z from "zod";

export const AccountDetailsSchema = z.object({
  name: z.string().min(1, { message: "Full name is required!" }),
  email: z
    .string()
    .min(1, { message: "Email is required!" })
    .email({ message: "Email is invalid!" }),
  phoneNumber: z
    .string()
    .regex(/^(09|\+639)\d{9}$/, { message: "Invalid phone number format!" })
    .min(1, { message: "Phone number is required!" }),
  password: z.string().min(1, { message: "Password is required!" }),
  confirmPassword: z
    .string()
    .min(1, { message: "Confirm password is required!" }),
});
