import { ArrowLeft, ArrowRight } from "lucide-react";

import { useEffect, useRef, useState } from "react";

interface Props {
  images: string | string[];
  name: string;
}

export const ProductImagesPreview = ({ images, name }: Props) => {
  const [currentImage, setCurrentImage] = useState(() =>
    Array.isArray(images) ? images[0] : images,
  );
  const [activeImage, setActiveImage] = useState(0);
  const [containerPosition, setContainerPosition] = useState("0px");

  const handleSwicth = (img: string, index: number) => {
    setCurrentImage(img);
    setActiveImage(index);
  };

  const imagesPreviewBoxRef = useRef<HTMLDivElement | null>(null);
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previewWidth = imagesPreviewBoxRef.current?.clientWidth;
    const firstChild = imagesContainerRef.current?.children[0] as HTMLElement;
    const imageWidth = firstChild?.clientWidth;

    if (
      imagesContainerRef.current &&
      previewWidth !== undefined &&
      imageWidth !== undefined
    ) {
      const totalImages = imagesContainerRef.current.children.length;

      const maxTranslate = totalImages * imageWidth - previewWidth;
      const translate = activeImage * imageWidth;

      const clampedTranslate = Math.min(translate, maxTranslate);

      setContainerPosition(
        `-${activeImage === images.length - 1 ? clampedTranslate + 80 : clampedTranslate}px`,
      );
    }
  }, [activeImage]);

  return (
    <div className="flex flex-col gap-2">
      <div className="mx-auto overflow-hidden p-4 md:p-6 rounded-2xl bg-background shadow-md">
        <figure className=" w-fit">
          <img className=" " src={currentImage} alt={name} />
        </figure>
      </div>
      {Array.isArray(images) && images.length > 1 && (
        <div
          ref={imagesPreviewBoxRef}
          className="max-w-2xl relative overflow-x-hidden"
        >
          <div
            style={{
              transform: `translateX(${containerPosition})`,
            }}
            ref={imagesContainerRef}
            className={`flex items-center gap-2  transition-all duration-300`}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => handleSwicth(img, i)}
                type="button"
                className={`${activeImage === i ? "border-2 border-amber" : "border border-gray-200"} hover:border-amber
hover:border-amber border p-2 bg-background w-full min-w-[180px] max-h-[150px] aspect-[3/2] rounded-md transition-all duration-300`}
              >
                {
                  <img
                    className="w-full  h-full object-cover"
                    src={img}
                    alt={name}
                  />
                }
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              handleSwicth(
                images[Math.max(0, activeImage - 1)],
                Math.max(0, activeImage - 1),
              )
            }
            className="abs-btn abs-left  px-2 py-1 shadow-sm  hover:-translate-y-1 hover:shadow-md active:translate-y-1 transition-all duration rounded bg-background"
          >
            <ArrowLeft className="icon" />
          </button>

          <button
            onClick={() =>
              handleSwicth(
                images[Math.min(images.length - 1, activeImage + 1)],
                Math.min(images.length - 1, activeImage + 1),
              )
            }
            className="abs-btn abs-right px-2 py-1 shadow-sm  hover:-translate-y-1 hover:shadow-md active:translate-y-1 transition-all duration rounded bg-background"
          >
            <ArrowRight className="icon  " />
          </button>
        </div>
      )}
    </div>
  );
};
