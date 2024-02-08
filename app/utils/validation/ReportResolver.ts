import z, {type ZodObject, type ZodString} from "zod";

type EmailSchemaType = {
    reason: ZodString,
    details: ZodString,
    reported_user_id: ZodString
}

const reportResolver: ZodObject<EmailSchemaType> = z.object({
  reason: z.string().min(6).max(100),
  details: z.string().min(6).max(500),
  reported_user_id: z.string()
});

export { reportResolver };
