import React from "react";
import Layout from "@/components/general/Layout";
import FavouritesTopSec from "@/components/player/FavouritesMainSec";
import { useUser } from "@/hooks/person.swr";
import { useSongList } from "@/hooks/song.swr";

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
