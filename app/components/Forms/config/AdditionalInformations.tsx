import { ChangeEvent, MutableRefObject, ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import Button from "../../UI/Button";
import Picture from "../../Icons/Picture";
import Cross from "../../Icons/Cross";
import { createPortal } from "react-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { additionalInformationsResolver } from "@/app/utils/validation/config/AdditionalInformationsResolver";
import { zodResolver } from "@hookform/resolvers/zod";

type AdditionalInformationsProps = {
  onNextStep: () => void;
  data: InterestType[];
  initialAdditionalInformations: FormType;
  onAdditionalInformationChange: (data: FormType) => void;
};

export type InterestType = {
  [x: string]: any;
};

type FormType = {
  bio: string;
  images: (File | string)[];
  interests: InterestType[];
};

export default function AdditionalInformations({
  onNextStep,
  data,
  initialAdditionalInformations,
  onAdditionalInformationChange,
}: AdditionalInformationsProps): JSX.Element {
  const [imagePreviews, setImagePreviews] = useState<string[]>(new Array(4).fill(""));
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<InterestType[]>([]);

  const { control, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm<FormType>({
    resolver: zodResolver(additionalInformationsResolver),
    defaultValues: {
      bio: "",
      images: new Array(4).fill(""),
      interests: [],
    },
  });

  const fileInputRefs: MutableRefObject<HTMLInputElement[]> = useRef<HTMLInputElement[]>([]);

  const handleImageChange = useCallback((index: number, e: ChangeEvent<HTMLInputElement>) => {
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
  }, [imagePreviews, imageFiles]);

  const triggerFileInputClick: (index: number) => () => void = (index: number) => () => {
    fileInputRefs.current[index].click();
  };

  const handleDelete = useCallback((e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();

    const newImagePreviews: string[] = [...imagePreviews];
    newImagePreviews[index] = "";
    setImagePreviews(newImagePreviews);

    const newImageFiles: File[] = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].value = "";
    }
  }, [imagePreviews, imageFiles])

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

  useEffect(() => {
    const newImagePreviews: string[] = [...imagePreviews];

    initialAdditionalInformations.images.forEach((image, index) => {
      const fileReader = new FileReader();
      if (image instanceof File) {
        fileReader.onload = e => {
          newImagePreviews[index] = e.target?.result as string;
          setImagePreviews([...newImagePreviews]);
        };
        fileReader.readAsDataURL(image);
      }
    });

    setImagePreviews(newImagePreviews);
    setImageFiles(initialAdditionalInformations.images.filter(image => image instanceof File) as File[]);

    setSelectedInterests(initialAdditionalInformations.interests || []);
    setValue("interests", initialAdditionalInformations.interests || []);

    setValue("bio", initialAdditionalInformations.bio || "");
  }, [initialAdditionalInformations]);

  const handleSelectedInterests = useCallback((interest: InterestType) => {
    const newSelectedInterests = [...selectedInterests];
    const index = newSelectedInterests.findIndex(item => item.id === interest.id);

    index === -1 ? newSelectedInterests.push(interest) : newSelectedInterests.splice(index, 1);

    setSelectedInterests(newSelectedInterests);
    setValue("interests", newSelectedInterests);
    clearErrors("interests");
  }, [selectedInterests, setValue, clearErrors]);

  const onSubmit: SubmitHandler<any> = useCallback((data) => {
    const formData = new FormData();

    console.log("Uploaded Files:", imageFiles);

    const updatedData = {
      ...data,
      images: imageFiles,
    };

    onAdditionalInformationChange(updatedData);
    onNextStep();
  }, [imageFiles, onAdditionalInformationChange]);

  function getErrorMessage(): string | null {
    if (errors?.interests) return errors?.interests?.message ?? null;
    if (errors?.bio) return errors?.bio?.message ?? null;
    return null;
  }

  return (
    <>
      {zoomModal}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row w-[450px] max-sm:w-full pt-[20px] gap-x-3">
          {imagePreviews.map((preview, index) => (
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
        </div>
        <div className="mt-2">
          <small className="text-[12px] text-subtitle_foreground">Astuce : Clique sur une image pour zoomer dessus</small>
        </div>
        <div className="mt-4">
          <div className="flex gap-x-2 gap-y-2 max-sm:gap-y-2 flex-wrap">
            {data.map((interest, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectedInterests(interest)}
                className={`font-medium text-[12px] px-2 py-1 max-sm:px-3 max-sm:py-1.5 outline outline-1 outline-whitish_border rounded-[6px] w-fit ${
                  selectedInterests.some(i => i.id === interest.id) ? "bg-whitish_border text-black" : "text-subtitle_foreground"
                }`}>
                {interest.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="text-[12px] font-medium"></label>
          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Écris ta bio"
                className="w-full h-[140px] resize-none rounded-[9px] outline outline-1 outline-whitish_border p-2 text-[12px]"
              />
            )}
          />
        </div>
        <p className="text-red-500 text-sm font-medium mt-3">{getErrorMessage()}</p>
        <Button
          variant={`${!!getErrorMessage() ? "error" : "default"}`}
          customClasses="mt-4 rounded-[9px] font-bold px-[25px] max-md:w-[100%]"
          disabled={!!getErrorMessage()}>
          Continuer
        </Button>
      </form>
    </>
  );
}
