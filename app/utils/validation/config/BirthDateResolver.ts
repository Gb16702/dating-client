import z, { type ZodObject, type ZodEffects, type ZodTypeAny } from "zod";

type BirthDateSchemaType = {
  day: ZodTypeAny,
  month: ZodTypeAny,
  year: ZodTypeAny
}

function isLeapYear(year: number) {
   return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

const birthDateResolver: ZodEffects<ZodObject<BirthDateSchemaType>> = z.object({
  day: z.string()
    .regex(/^\d{1,2}$/, "Le jour doit être un nombre")
    .transform(Number)
    .refine(day => day >= 1 && day <= 31, { message: "Jour invalide" }),
  month: z.string()
    .regex(/^\d{1,2}$/, "Le mois doit être un nombre")
    .transform(Number)
    .refine(month => month >= 1 && month <= 12, "Mois invalide"),
  year: z.string()
    .regex(/^\d{4}$/, "L'année doit être un nombre à 4 chiffres")
    .transform(Number)
    .refine(year => year > 1950 && year < (new Date().getFullYear() - 18), "Année invalide"),
}).refine(({day, month, year }) => {
  if(month === 2) return day <= (isLeapYear(year) ? 29 : 28);
  else if([4, 6, 9, 11].includes(month)) return day <= 30;
  return true;
}, { message: "La date de naissance n'est pas valide", path: ["day"] })

export { birthDateResolver };
