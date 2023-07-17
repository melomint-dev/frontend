import useSWR from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import songService from "@/services/song.service";
import { ISong } from "@/interfaces/ISong";

// interface ISong {
//   id: string;
//   name: string;
//   artist: string;
//   freeUrl: string;
//   img: string;
//   bannerImg: string;
//   uploadedAt: string; // time

//   similarSongs: { string: [string] }; // original
//   similarTo: { string: [string] }; // copied

//   likes: number;
//   plays: { string: number };
//   playTime: { string: number };
// }

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
