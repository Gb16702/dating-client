import z, {  } from "zod";

const trackResolver: any = z.object({
  selectedTracks: z.array(z.object({
    id: z.string()
  })).nonempty("Vous devez sélectionner au moins une piste")
})

export { trackResolver };