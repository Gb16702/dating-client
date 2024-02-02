import { type StoreApi, type UseBoundStore, create } from "zustand";



type UserProfile = {
  gender_id: number;
  city_id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  bio: string;
  profile_picture: string;
  is_profile_displayed: boolean;
  user_id: string;
}

type UserSession = {
  id: string;
  email: string;
  is_admin: boolean;
  is_verified: boolean;
  is_banned: boolean;
  is_profile_complete: boolean;
  profile: UserProfile;
  token: string;
}

type SessionState = {
  currentSession: UserSession | null;
  setSession: (session: UserSession) => void;
  removeSession: () => void,

};

export const useSessionStore: UseBoundStore<StoreApi<SessionState>> = create<SessionState>((set) => ({
  currentSession: null,
  setSession: (session) => set({ currentSession: session }),
  removeSession: () => set({ currentSession: null }),
}));
