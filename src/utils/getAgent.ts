import { BASER_URL } from "@/constants";

export const getAgent = async ({ token }: { token: string }) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASER_URL}/my/agent`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getWaypoints = async ({
  token,
  headquarters,
}: {
  token: string;
  headquarters: string;
}) => {
  const splitedString = headquarters.split("-");
  const systems = `${splitedString[0]}-${splitedString[1]}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(`${BASER_URL}/systems/${systems}`, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const getWaypoint = async ({
  token,
  headquarters,
}: {
  token: string;
  headquarters: string;
}) => {
  const splitedString = headquarters.split("-");
  const systems = `${splitedString[0]}-${splitedString[1]}`;

  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(
    `${BASER_URL}/systems/${systems}/waypoints/${headquarters}`,
    options
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
