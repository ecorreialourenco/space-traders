import { BASE_URL } from "@/constants";
import { options } from "./requestOptions";

export const getAgent = async ({ token }: { token: string }) => {
  const response = await fetch(`${BASE_URL}/my/agent`, options(token));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const handleSystemString = (headquarters: string) => {
  const splitedString = headquarters.split("-");
  return `${splitedString[0]}-${splitedString[1]}`;
};
