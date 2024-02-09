"use client";

import { useSessionStore } from "@/app/stores/sessionStore";
import { getCookie } from "cookies-next";
import { ChangeEvent, MutableRefObject, ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cross from "../../Icons/Cross";
import Picture from "../../Icons/Picture";
import Toast from "../../UI/Toast";
import { useRouter } from "next/navigation";

export default function PicturesForm({ pictures }: { pictures: any }) {
  const { setSession, currentSession } = useSessionStore();
  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      pictures: new Array(4).fill(""),
    },
  });

  const [mainPicture, ...secondaryPictures] = pictures;

  const router = useRouter();

  const [imagePreviews, setImagePreviews] = useState<string[]>(new Array(4).fill(""));
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fileInputRefs: MutableRefObject<HTMLInputElement[]> = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    const newImagePreviews: string[] = [mainPicture, ...secondaryPictures, ...Array(4 - pictures.length).fill("")];

    secondaryPictures.forEach((picture: string | File, index: number) => {
      const fileReader = new FileReader();
      if (picture instanceof File) {
        fileReader.onload = e => {
          const newImagePreviews: string[] = [...imagePreviews];
          newImagePreviews[index + 1] = e.target?.result as string;
          setImagePreviews(newImagePreviews);
        };
        fileReader.readAsDataURL(picture);
      }
    });

    setImagePreviews(newImagePreviews);
  }, [pictures]);

  const handleImageChange = useCallback(
    (index: number, e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length) {
        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = e => {
          const newImagePreviews: string[] = [...imagePreviews];
          newImagePreviews[index] = e.target?.result as string;
          setImagePreviews(newImagePreviews);

          const newImageFiles: File[] = [...imageFiles];
          newImageFiles[index] = file;
          setImageFiles(newImageFiles);
        };

        fileReader.readAsDataURL(file);
      }
    },
    [imagePreviews, imageFiles]
  );

  const triggerFileInputClick: (index: number) => () => void = (index: number) => () => {
    fileInputRefs.current[index].click();
  };

  const handleDelete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
      e.stopPropagation();

      const newImagePreviews = [...imagePreviews];
      const urlToDelete = index !== 0 ? newImagePreviews[index] : "";

      newImagePreviews[index] = "";
      setImagePreviews(newImagePreviews);

      const newImageFiles = [...imageFiles];
      if (index < newImageFiles.length) {
        newImageFiles.splice(index, 1);
        setImageFiles(newImageFiles);
      }

      if (!(pictures[index] instanceof File)) {
        setImagesToDelete([...imagesToDelete, urlToDelete]);
      }

      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index].value = "";
      }
    },
    [imagePreviews, imageFiles, imagesToDelete, pictures]
  );

  function handleZoom(e: React.MouseEvent<HTMLDivElement>, preview: string) {
    e.stopPropagation();
    setZoomedImage(preview);
    document.body.style.overflow = "hidden";
  }

  function handleCloseZoom() {
    setZoomedImage(null);
    document.body.style.overflow = "unset";
  }

  const zoomModal: ReactPortal | null = zoomedImage
    ? createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50" onClick={handleCloseZoom}>
          <img src={zoomedImage} alt="Zoomed" className="w-[60%] h-[60%] rounded-[16px] object-cover max-sm:w-[100%] max-sm:h-[50%]" />
        </div>,
        document.body
      )
    : null;

  const extractPublicIdFromImage = (url: string) => {
    const publicId = url.split("/").pop()?.split(".")[0];
    return publicId;
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    console.log(imagesToDelete);

    imageFiles.forEach((file: File, index) => {
      if (file instanceof File) {
        formData.append(`files`, file); // Tous les fichiers dans la même clé
        formData.append(`roles`, index === 0 ? "main" : "secondary"); // Les rôles correspondants dans une autre clé
      }
    });

    if (imagesToDelete.length) {
      formData.append("imagesToDelete", JSON.stringify(imagesToDelete.map(extractPublicIdFromImage)));
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER}api/users/edit-picture`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      body: formData,
    });

    const dataFromResponse = await response.json();
    if (response.ok) {
      toast.custom(t => <Toast type="Succès" message={dataFromResponse.message} t={t} />);
      const updatedProfilePicture = dataFromResponse.profile_picture
        ? { ...currentSession?.profile, profile_picture: dataFromResponse.profile_picture }
        : currentSession?.profile;

      const updatedSecondaryPictures = dataFromResponse.secondary_pictures
        ? dataFromResponse.secondary_pictures.map((pic: string) => ({ picture_url: pic }))
        : currentSession?.user_secondary_profile_pictures;

        setSession({
          ...currentSession,
        // @ts-ignore
        profile: updatedProfilePicture,
        user_secondary_profile_pictures: updatedSecondaryPictures,
      });

      router.refresh()
    } else {
      console.error(dataFromResponse.message);
    }
  };

  return (
    <>
      {zoomModal}
      <form id="form" className="bg-white flex flex-grow min-h-full px-2 gap-x-2" onSubmit={handleSubmit(onSubmit)}>
        {imagePreviews.map((preview: string, index: number) => (
          <div
            key={index}
            className="border border-whitish_border rounded-[12px] flex items-center justify-center cursor-pointer w-[95px] h-[95px] max-sm:w-[80px] max-sm:h-[80px] overflow-hidden bg-whitish_background"
            onClick={triggerFileInputClick(index)}>
            {preview ? (
              <div className="relative w-full h-full" onClick={e => handleZoom(e, preview)}>
                <img src={preview} alt={`Aperçu ${index}`} className="w-full h-full object-cover" />
                {index === 0 && (
                  <div className="absolute bottom-[6px] left-1 w-fit px-2 h-[17px] rounded-full bg-white/[.4] flex items-center justify-center">
                    <p className="text-[10px] font-semibold text-white">Principale</p>
                  </div>
                )}
                <div>
                  <button
                    type="reset"
                    className="absolute right-[3px] top-[3px] p-[2.5px] w-fit bg-white/[.4] rounded-full"
                    onClick={e => handleDelete(e, index)}>
                    <Cross classes={"w-4 h-4 text-white"} border={3} />
                  </button>
                </div>
              </div>
            ) : (
              <Picture classes={"w-[22px] h-[22px] fill-gray_border"} />
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={el => (fileInputRefs.current[index] = el!)}
              onChange={e => handleImageChange(index, e)}
            />
          </div>
        ))}
      </form>
      <button type="submit" form="form">
        Envoyer
      </button>
    </>
  );
}
