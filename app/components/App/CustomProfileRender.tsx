"use client";

import { profileSectionStore } from "@/app/stores/profileSectionStore";
import { useSessionStore } from "@/app/stores/sessionStore";
import PicturesForm from "../Forms/edit-profile/PicturesForm";

export default function CustomProfileRender() {
  const { active } = profileSectionStore();
  const { currentSession } = useSessionStore();

  const mainPicture: string | undefined = currentSession?.profile?.profile_picture;
  const secondaryPictures: string[] | undefined = currentSession?.user_secondary_profile_pictures.map((picture) => picture.picture_url);

  console.log(currentSession?.profile?.profile_picture);


  let arrayPictures: (string | undefined)[] = [ mainPicture ];
  if(secondaryPictures) {
    arrayPictures = [mainPicture, ...secondaryPictures];
  }

  return (
    <>
      <section className="flex flex-col min-w-full h-full bg-white">
        <div className="py-10">
          {active === "photos" && (
            <>
              <div className="min-w-full px-2 h-[75%] bg-white">
                <h1 className="text-sm font-medium">Mes Photos</h1>
                <h2 className="text-subtitle_foreground text-xs mt-0.5">
                  Complète ton album, multiplie tes chances
                </h2>
              </div>
              <PicturesForm pictures={arrayPictures} />
            </>
          )}

          {active === "musiques" && (
            <div className="min-w-full h-full bg-white">
              <h1 className="text-sm font-medium">Mes Musiques</h1>
              <h2 className="text-subtitle_foreground text-xs mt-0.5">
                Modifie ta playlist, partage tes goûts
              </h2>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
