import React from "react";
import Layout from "@/components/general/Layout";
import AuthorProfile from "@/components/player/author/AuthorProfileCover";
import styles from "@/styles/player/a/AuthorProfilePage.module.css";
import { Title } from "@mantine/core";
import MusicComponent from "@/components/player/MusicComponent";

const TEMP_SONGS_DATA = new Array(10).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
  duration: 150,
}));

function ArtistProfile() {
  const songs = TEMP_SONGS_DATA;
  return (
    <div className={styles.container}>
      <Layout
        childern={
          <div className={styles.container}>
            <AuthorProfile
              artist={{
                name: "Jigardan Gadhvi",
                image:
                  "https://i.scdn.co/image/ab6761860000101648db44742bf21308f4ece612",
                nft: {
                  src: "https://static.toiimg.com/photo/msid-75250578/75250578.jpg",
                  price: 5,
                  priceUnit: "FLOW",
                },
                membersCount: 13498,
              }}
            />
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
