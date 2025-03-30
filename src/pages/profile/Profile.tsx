import { Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";

import { Loading } from "@/components";
import { useAgent, useFactions } from "@/hooks";
import { formatCredits } from "@/utils";

export const Profile = () => {
  const { data: sessionData } = useSession();
  const { data: userData } = useAgent();
  const { data: factionData } = useFactions({ page: 1 });

  const expireDate = new Date(sessionData?.expires ?? "").toDateString();
  const userFaction = factionData?.data.find(
    (faction) => faction.symbol === userData?.startingFaction
  );
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full items-center mx-4 overflow-auto">
        <Typography variant="h3" className="text-center">
          Profile
        </Typography>

        <div className="bg-white p-4 w-full">
          <Typography variant="h4" className="text-center">
            Agent
          </Typography>

          <div className="flex flex-row justify-between mt-4">
            <Typography variant="body1">
              Headquarters: {userData?.headquarters}
            </Typography>
            <Typography variant="body1">
              Ships: {userData?.shipCount}
            </Typography>
            <Typography variant="body1">
              Current credits: {formatCredits(userData?.credits ?? 0)}
            </Typography>
          </div>

          <Typography variant="h4" className="text-center mt-6">
            Faction
          </Typography>

          <div className=" mt-4">
            <Typography variant="h5">{userFaction?.name}</Typography>
            <Typography variant="body1">{userFaction?.description}</Typography>
          </div>

          <Typography variant="h4" className="text-center mt-6">
            Account
          </Typography>

          <div className="flex flex-row justify-between mt-4">
            <Button
              variant="text"
              className="text-black"
              onClick={() => {}}
              disabled
            >
              Change Password
            </Button>
            <Typography variant="body1">Expires: {expireDate}</Typography>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
