import imageCompression from "browser-image-compression";

export const useImageCompression = async (file: File): Promise<File> => {
  const compressionFile = await imageCompression(file, {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 300,
    useWebWorker: true,
  })
    .then((compressedFile) => {
      return compressedFile;
    })
    .catch((error) => {
      return Promise.reject(error);
    });

  return compressionFile;
};
