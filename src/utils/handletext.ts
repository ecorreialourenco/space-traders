export const handleText = (text: string) => {
  const splitedText = text.split("-");
  return splitedText[splitedText.length - 1];
};
