import React from "react";
import Layout from "@/components/general/Layout";
import FavouritesTopSec from "@/components/player/FavouritesMainSec";

const TEMP_SONGS_DATA = new Array(10).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
  duration: 150,
}));  

function ArtistProfile() {
  const songs = TEMP_SONGS_DATA;
  return <Layout childern={<FavouritesTopSec songs={songs} />} />;
}

export default ArtistProfile;
