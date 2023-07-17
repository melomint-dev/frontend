import useSWR from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import songService from "@/services/song.service";
import { ISong } from "@/interfaces/ISong";

export function useSong(id: string) {
  const { data, error, isLoading } = useSWR(
    [SWR_CONSTANTS.GET_USER, id],
    songService.getSong
  );

  return {
    songData: data as ISong,
    isSongDataLoading: isLoading as boolean,
    errorFetchingSongData: error,
  };
}

export function useSongList(list: string[]) {
  const { data, error, isLoading } = useSWR(
    [SWR_CONSTANTS.GET_USER, list],
    songService.getListOfSongDetailsViaSongIds
  );

  return {
    songListData: data as ISong[],
    isSongListDataLoading: isLoading as boolean,
    errorFetchingSongListData: error,
  };
}

export async function addSongFetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      id: string;
      name: string;
      freeUrl: string;
      img: string;
    };
  }
) {
  try {
    return await songService.addSong({
      id: arg.id,
      name: arg.name,
      freeUrl: arg.freeUrl,
      img: arg.img,
    });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
