export const getImageSrc = (htmlString: string): string | undefined => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const imgElement = doc.querySelector("img");
  console.log(imgElement);

  if (imgElement) {
    const src = imgElement.getAttribute("src");
    return src || undefined;
  } else {
    return undefined;
  }
};
