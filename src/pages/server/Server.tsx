import { Typography } from "@mui/material";
import React, { Suspense } from "react";

import { Leaderboard, Loading } from "@/components";
import { useServerInfo } from "@/hooks";

export const Server = () => {
  const { data } = useServerInfo();

  const handleDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="flex flex-col h-full items-center mx-4 overflow-auto">
        <Typography variant="h3" className="text-center">
          Server Info
        </Typography>

        <div className="bg-white p-4">
          <div className="border-b-2 border-gray-300 border-dashed pb-2">
            <Typography variant="h4" className="text-center">
              Announcements
            </Typography>
            {data?.announcements.map((announcement) => (
              <div key={announcement.title} className="py-1">
                <Typography variant="h5">{announcement.title}</Typography>
                <Typography variant="body1">{announcement.body}</Typography>
              </div>
            ))}
          </div>

          <div className="border-b-2 border-gray-300 border-dashed pb-2 pt-4">
            <Typography variant="h4" className="text-center">
              LeaderBoards
            </Typography>

            <div className="flex justify-between">
              <div className="text-center">
                <Typography variant="h5" className="text-center">
                  Credits
                </Typography>

                <Leaderboard leaders={data?.leaderboards.mostCredits ?? []} />
              </div>
              <div className="text-center">
                <Typography variant="h5" className="text-center">
                  Charts
                </Typography>

                <Leaderboard
                  leaders={
                    data?.leaderboards.mostSubmittedCharts.map((item) => ({
                      agentSymbol: item.agentSymbol,
                      credits: item.chartCount,
                    })) ?? []
                  }
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Typography variant="h4" className="text-center">
              Reset
            </Typography>
            <div className="flex justify-center gap-4">
              <Typography variant="body1" className="text-center">
                Last: {handleDate(data?.resetDate ?? "")}
              </Typography>

              <Typography variant="body1" className="text-center">
                Next: {handleDate(data?.serverResets.next ?? "")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
