import z, {type ZodObject, type ZodString} from "zod";
import { EmailRegex } from "./Regex";

type EmailSchemaType = {
    email: ZodString,
}

const EMAIL_REGEX: RegExp = EmailRegex();

const forgotPasswordResolver: ZodObject<EmailSchemaType> = z.object({
  email: z.string().regex(EMAIL_REGEX),
});

export { forgotPasswordResolver };
