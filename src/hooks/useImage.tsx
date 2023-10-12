export default function useImage(str: string) {
  // img 태그 추출
  const regex = /<img[^>]+src="([^">]+)"/g;
  const result = [];
  let match;

  while ((match = regex.exec(str))) {
    result.push({ url: match[1] });
  }

  return result;
}
