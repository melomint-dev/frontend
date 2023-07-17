import useSWR from "swr";
import flowAbstractionService from "@/services/abstractions.flow.service";
import API_CONSTANTS from "@/utils/apiConstants";
import { IUser } from "./person.swr";

// {
//   "id": "s1",
//   "name": "s1.name",
//   "artist": "0x7df58c686bbf71ed",
//   "freeUrl": "s1.free",
//   "img": "s1.img",
//   "uploadedAt": "1689584258.00000000",
//   "similarSongs": {

//   },
//   "similarTo": {

//   },
//   "likes": "0",
//   "plays": {

//   },
//   "playTime": {

//   }
// }
export interface ISong {
  id: string;
  name: string;
  artist: IUser;
  freeUrl: string;
  img: string;
  duration: number;
  uploadedAt: string;
  similarSongs: {
    [key: string]: string;
  };
  similarTo: {
    [key: string]: string;
  };
  likes: string;
  plays: {
    [key: string]: number;
  };
  playTime: {
    [key: string]: number;
  };
}

export function useTrendingSongs() {
  const { data, error, isLoading } = useSWR(
    API_CONSTANTS.GET_TRENDING_SONGS,
    flowAbstractionService.getTrendndingSongs
  );

  return {
    trendingSongsData: data as ISong[],
    isTrendingSongsDataLoading: isLoading,
    errorFetchingTrendingSongsData: error,
  };
}

export function useLatestSongs() {
  const { data, error, isLoading } = useSWR(
    API_CONSTANTS.GET_LATEST_SONGS,
    flowAbstractionService.getLatestSongs
  );

  return {
    latestSongsData: data as ISong[],
    isLatestSongsDataLoading: isLoading,
    errorFetchingLatestSongsData: error,
  };
}

export function useArtistsOnRise() {
  const { data, error, isLoading } = useSWR(
    API_CONSTANTS.GET_ARTISTS_ON_RISE,
    flowAbstractionService.getArtistsOnRise
  );

  return {
    artistsOnRiseData: data as IUser[],
    isArtistsOnRiseDataLoading: isLoading,
    errorFetchingArtistsOnRiseData: error,
  };
}
