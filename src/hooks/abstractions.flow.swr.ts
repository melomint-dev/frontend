import useSWR from "swr";
import flowAbstractionService from "@/services/abstractions.flow.service";
import API_CONSTANTS from "@/utils/apiConstants";
import { ISong } from "@/interfaces/ISong";
import { IUser } from "@/interfaces/IUser";

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

export function useSearchQuery(query: string) {
  const { data, error, isLoading } = useSWR(
    [API_CONSTANTS.SEARCH_QUERY, query],
    flowAbstractionService.searchQuery
  );

  return {
    searchQueryData: data as {
      songs: ISong[];
      artists: IUser[];
    },
    isSearchQueryDataLoading: isLoading,
    errorFetchingSearchQueryData: error,
  };
}
