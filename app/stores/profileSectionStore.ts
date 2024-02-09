import { create } from "zustand";

type Active = {
    active: string | null;
    setActive: (active: string | null) => void;
}

export const profileSectionStore = create<Active>((set) => ({
   active: "photos",
   setActive: (active: any) => set({ active }),
}))
