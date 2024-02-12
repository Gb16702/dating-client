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
import Loader from "../../Icons/Loader";
import Image from "next/image";

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
  const [disabled, setDisabled] = useState(true);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const hasInitialLengthChanged = imageFiles.length > 0 || imagesToDelete.length > 0;
    setDisabled(!hasInitialLengthChanged || loading);
  }, [imageFiles, imagesToDelete, loading]);

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
    setFirstRender(false);
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
          <Image
            src={zoomedImage}
            alt="Zoomed"
            width={100}
            height={100}
            className="w-[60%] h-[60%] rounded-[16px] object-cover max-sm:w-[94%] max-sm:h-[40%] max-w-[420px] max-h-[420px]"
          />
        </div>,
        document.body
      )
    : null;

  const extractPublicIdFromImage = (url: string) => {
    const publicId = url.split("/").pop()?.split(".")[0];
    return publicId;
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();

    imageFiles.forEach((file: File, index) => {
      if (file instanceof File) {
        formData.append(`files`, file);
        formData.append(`roles`, index === 0 ? "main" : "secondary");
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
    toast.custom(t => <Toast type={response.ok ? "Succès" : "Erreur"} message={dataFromResponse.message} t={t} />);
    setLoading(false);
    if (response.ok) {
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

      router.refresh();
    } else {
      console.error(dataFromResponse.message);
    }
  };

  return (
    <>
      {zoomModal}
      <form id="form" className="flex min-h-full gap-x-2 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row flex-grow gap-x-2 ">
          {imagePreviews.map((preview: string, index: number) => (
            <div
              key={index}
              className={`border border-whitish_border rounded-[12px] flex items-center justify-center cursor-pointer w-[95px] h-[95px] max-sm:w-[80px] max-sm:h-[80px] overflow-hidden`}
              onClick={triggerFileInputClick(index)}>
              {preview ? (
                <div className="relative w-full h-full" onClick={e => handleZoom(e, preview)}>
                  <Image height={100} width={100} src={preview} alt={`Aperçu ${index}`} className="w-full h-full object-cover" />
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
              ) : firstRender ? (
                <Loader stroke="#C9C9C9" />
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
        </div>
        <div className="h-[calc(100vh/100*8)] w-full flex items-center">
          <button
            type="submit"
            form="form"
            disabled={disabled}
            className={`bg-black px-4 py-3 min-w-[100px] rounded-[9px] text-white font-semibold text-sm flex items-center justify-center ${
              disabled && "opacity-50 cursor-not-allowed"
            }`}>
            {loading ? <Loader /> : "Enregistrer"}
          </button>
        </div>
      </form>
    </>
  );
}
