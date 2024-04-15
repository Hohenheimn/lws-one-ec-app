import { z } from "zod";

export const MeterAccountSchema = z.object({
  coop: z.number().gt(0, { message: "Coop is required!" }),
  meterNumber: z.string().min(1, { message: "Meter Number is required!" }),
});
