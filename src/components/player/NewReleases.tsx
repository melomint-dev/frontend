import styles from "./NewReleases.module.css";
import { Title, Text } from "@mantine/core";
import NewSongComponents from "./NewSongComponents";
import { user } from "@/assets/player";

const TEMP_SONGS_DATA = new Array(4).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
}));

const NewReleases = () => {
  const songs = TEMP_SONGS_DATA;
  return (
    <div className={styles.container}>
      <Title order={5} weight={700}>
        New Releases
      </Title>
      <div className={styles.songs}>
      {songs.map((song) => (
          <NewSongComponents song={song} key={song._id} />
        ))}
      </div>
    </div>
  );
};

export default NewReleases;
