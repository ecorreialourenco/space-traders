import { BASE_URL } from "@/constants";

interface GetContractProps {
  token: string;
}

interface AcceptContractProps {
  token: string;
  id: string;
}

export const getContracts = async ({ token }: GetContractProps) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASE_URL}/my/contracts`, options);

  return response.json();
};

export const acceptContract = async ({ token, id }: AcceptContractProps) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BASE_URL}/my/contracts/${id}/accept`,
    options
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
