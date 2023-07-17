import React from "react";
import Layout from "@/components/general/Layout";
import FavouritesTopSec from "@/components/player/FavouritesMainSec";
import { useUser } from "@/hooks/person.swr";
import { useSongList } from "@/hooks/song.swr";

const TEMP_SONGS_DATA = new Array(10).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
  duration: 150,
}));

function ArtistProfile() {
  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();
  const { songListData, isSongListDataLoading, errorFetchingSongListData } =
    useSongList(
      userData
        ? Object.keys(userData?.likedSongs).filter(
            (x) => userData?.likedSongs[x]
          )
        : []
    );
  return (
    <Layout
      childern={
        <FavouritesTopSec
          songs={songListData}
          isLoading={
            isUserDataLoading ||
            errorFetchingUserData ||
            isSongListDataLoading ||
            errorFetchingSongListData
          }
        />
      }
    />
  );
}

export default ArtistProfile;
