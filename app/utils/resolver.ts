import z, {type ZodObject, type ZodString} from "zod";

type LoginSchemaType = {
    email: ZodString,
    password: ZodString
}

const EMAIL_REGEX = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/

const loginSchemaObject: ZodObject<LoginSchemaType> = z.object({
  email: z.string().regex(EMAIL_REGEX),
  password: z.string().min(6).max(100),
});

export { loginSchemaObject };
