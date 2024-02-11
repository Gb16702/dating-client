"use client";

import { profileSectionStore } from "@/app/stores/profileSectionStore";
import { useSessionStore } from "@/app/stores/sessionStore";
import PicturesForm from "../Forms/edit-profile/PicturesForm";
import TracksForm from "../Forms/edit-profile/TracksForm";

export default function CustomProfileRender() {
  const { active } = profileSectionStore();
  const { currentSession } = useSessionStore();

  const mainPicture: string | undefined = currentSession?.profile?.profile_picture;
  const secondaryPictures: string[] | undefined = currentSession?.user_secondary_profile_pictures.map(picture => picture.picture_url);
  const favoriteTracks = currentSession?.favorite_tracks.map(track => track.track_id);

  let arrayPictures: (string | undefined)[] = [mainPicture];
  if (secondaryPictures) {
    arrayPictures = [mainPicture, ...secondaryPictures];
  }

  return (
    <>
      <section className="flex flex-col min-w-full h-full bg-white">
        <div className="min-h-[73px] flex items-center">
          <div className="min-w-full px-2 h-[60%] bg-white">
            <h1 className="font-semibold">{active!.charAt(0).toUpperCase() + active!.slice(1)}</h1>
            {active === "photos" && <h2 className="text-subtitle_foreground text-sm mt-0.5">Complète ton album, multiplie tes chances</h2>}
            {active === "musiques" && <h2 className="text-subtitle_foreground text-sm mt-0.5">Modifie ta playlist, partage tes goûts</h2>}
          </div>
        </div>
        <div className="h-full w-full px-2 pt-6">
          {active === "photos" && <PicturesForm pictures={arrayPictures} />}
          {active === "musiques" && <TracksForm favoriteTracks={favoriteTracks} />}
        </div>
      </section>
    </>
  );
}
