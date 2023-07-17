import { useState, useEffect, use } from "react";
import Layout from "@/components/general/Layout";
import AuthorProfile from "@/components/player/author/AuthorProfileCover";
import styles from "@/styles/player/a/AuthorProfilePage.module.css";
import { Title, Skeleton } from "@mantine/core";
import MusicComponent from "@/components/player/MusicComponent";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useArtist, buyNFTFetcher } from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";

import API_CONSTANTS from "@/utils/apiConstants";

const TEMP_SONGS_DATA = new Array(10).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
  duration: 150,
}));

function ArtistProfile() {
  const router = useRouter();
  const [artistId, setArtistId] = useState(router.query.slug as string);

  useEffect(() => {
    setArtistId(router.query.slug as string);
  }, [router.query.slug]);

  const songs = TEMP_SONGS_DATA;
  const { artistData, isArtistDataLoading, errorFetchingArtistData } =
    useArtist(artistId);

  return (
    <div className={styles.container}>
      <Layout
        childern={
          <div className={styles.container}>
            {!isArtistDataLoading && !errorFetchingArtistData ? (
              <AuthorProfile
                artist={{
                  name: artistData?.firstName + " " + artistData?.lastName,
                  image: API_CONSTANTS.IPFS_BASE_URL + artistData?.img,
                  nft: {
                    src: "https://static.toiimg.com/photo/msid-75250578/75250578.jpg",
                    price: artistData?.NFTprice,
                    priceUnit: "FLOW",
                  },
                  membersCount:
                    artistData &&
                    Object.values(artistData?.subscribers).filter((x) => x)
                      .length,
                }}
              />
            ) : (
              <Skeleton height={445} radius={0} />
            )}
            <div className={styles.songs}>
              <Title order={5}>Songs</Title>
              <div className={styles.songsList}>
                {songs.map((song) => (
                  <MusicComponent song={song} key={song._id} showFull />
                ))}
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default ArtistProfile;
