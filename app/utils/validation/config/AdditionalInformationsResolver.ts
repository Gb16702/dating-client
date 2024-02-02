import { z } from "zod";

const InterestSchema: any = z.object({
  id: z.any(),
  name: z.string(),
});

export const additionalInformationsResolver: any = z.object({
  interests: z.array(InterestSchema).nonempty("Vous devez ajouter au moins un intérêt"),
  bio: z.string().nonempty("Vous devez ajouter une description"),
});
