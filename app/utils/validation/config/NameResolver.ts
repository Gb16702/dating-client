import z, { type ZodObject, type ZodString } from "zod";

type NameSchemaType = {
  firstName: ZodString,
  lastName: ZodString
}

const nameResolver : ZodObject<NameSchemaType> = z.object({
  firstName: z.string().nonempty("Le prénom ne peut pas être vide").min(2, "Le prénom est trop court").max(50, "Le prénom est trop long"),
  lastName: z.string().nonempty("Le nom ne peut pas être vide").min(2, "Le nom est trop court").max(50, "Le nom est trop long"),
})

export { nameResolver };