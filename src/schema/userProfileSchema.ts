import { z } from "zod";


export const userProfileSchema = z.object({
  userFname: z.string().min(1, "First Name is required"),
  userMname: z.string().optional(),
  userLname: z.string().min(1, "Last Name is required"),
  userEmail: z.string().min(1, "Email is Required").email("Invalid Email"),
  userDob: z.date(),
  userContact: z.string().min(1, "Contact is required"),
});
