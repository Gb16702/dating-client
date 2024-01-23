import z, {type ZodObject, type ZodString} from "zod";

type PasswordSchemaType = { password: ZodString }

const forgotPasswordResetFormResolver: ZodObject<PasswordSchemaType> = z.object({
    password: z.string(),
});

export { forgotPasswordResetFormResolver };
