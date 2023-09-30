export default function useImage(str: string) {
  const regex = /<img[^>]+src="?([^"\s]+)"?\s*\/>/g;
  const result = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(str))) {
    result.push(match[1]);
  }

  console.log(result);

  // return result;
}
