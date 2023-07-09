import Layout from "@/components/general/Layout";
import React from "react";
import TopMusic from "@/components/player/TopMusic";
import TopArtist from "@/components/player/TopArtist";
import NewReleases from "@/components/player/NewReleases";

import { Button } from "@mantine/core";

function Player() {
  return (
    <Layout
      childern={
        <div className="p-[2.25rem] space-y-[2.06rem]">
          <TopMusic />
          <TopArtist />
          <NewReleases />
        </div>
      }
    />
  );
}

export default Player;
