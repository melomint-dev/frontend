import Layout from "@/components/general/Layout";
import React from "react";
import TopMusic from "@/components/player/TopMusic";
import TopArtist from "@/components/player/DisplayArtist";
import NewReleases from "@/components/player/NewReleases";

import styles from "@/styles/player/PlayerPage.module.css";
import { useRouter } from "next/router";
import {
  useArtistsOnRise,
  useSearchQuery,
  useTrendingSongs,
} from "@/hooks/abstractions.flow.swr";

function DefaultHomePageLayout() {
  const {
    trendingSongsData,
    isTrendingSongsDataLoading,
    errorFetchingTrendingSongsData,
  } = useTrendingSongs();

  const {
    artistsOnRiseData,
    isArtistsOnRiseDataLoading,
    errorFetchingArtistsOnRiseData,
  } = useArtistsOnRise();

  return (
    <>
      <TopMusic
        songs={trendingSongsData}
        isLoading={isTrendingSongsDataLoading || errorFetchingTrendingSongsData}
      />
      <TopArtist
        title="Artists on Rise"
        artists={artistsOnRiseData}
        isLoading={isArtistsOnRiseDataLoading || errorFetchingArtistsOnRiseData}
      />
      <NewReleases />
    </>
  );
}

function SearchPageLayout({ query }: { query: string }) {
  const {
    searchQueryData,
    isSearchQueryDataLoading,
    errorFetchingSearchQueryData,
  } = useSearchQuery(query);

  return (
    <>
      <TopMusic
        songs={searchQueryData?.songs}
        isLoading={isSearchQueryDataLoading || errorFetchingSearchQueryData}
        title={"Search Results for " + query}
        description="Songs matching your search query"
      />
      <TopArtist
        title="Artists"
        artists={searchQueryData?.artists}
        isLoading={isSearchQueryDataLoading || errorFetchingSearchQueryData}
      />
    </>
  );
}

function Player() {
  const router = useRouter();
  const { search } = router.query;

  return (
    <Layout
      childern={
        <div className={styles.container}>
          {search ? (
            <SearchPageLayout query={search as string} />
          ) : (
            <DefaultHomePageLayout />
          )}
        </div>
      }
    />
  );
}

export default Player;
