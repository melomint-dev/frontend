import styles from "./NewReleases.module.css";
import { Title, Text, Skeleton } from "@mantine/core";
import NewSongComponents from "./NewSongComponents";
import { user } from "@/assets/player";
import { useLatestSongs } from "@/hooks/abstractions.flow.swr";

const TEMP_SONGS_DATA = new Array(4).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
}));

const NewReleases = () => {
  const songs = TEMP_SONGS_DATA;
  const {
    latestSongsData,
    isLatestSongsDataLoading,
    errorFetchingLatestSongsData,
  } = useLatestSongs();

  return (
    <div className={styles.container}>
      <Title order={5} weight={700}>
        New Releases
      </Title>
      <div className={styles.songs}>
        {isLatestSongsDataLoading || errorFetchingLatestSongsData ? (
          <Skeleton height={180} width={500} />
        ) : (
          latestSongsData.map((song) => (
            <NewSongComponents song={song} key={song.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default NewReleases;
