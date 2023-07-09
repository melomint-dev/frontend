import Layout from "@/components/general/Layout";
import React from "react";
import TopMusic from "@/components/player/TopMusic";
import TopArtist from "@/components/player/TopArtist";


function Player() {
  return <Layout childern={<div className="p-[2.25rem] space-y-[2.06rem]">
    <TopMusic />
    <TopArtist />
  </div>} />;
}

export default Player;
