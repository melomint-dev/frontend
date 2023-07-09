import { Text, Title } from "@mantine/core";
import { user } from "@/assets/player";
import MusicComponent from "./MusicComponent";
import styles from "./TopMusic.module.css";

const TEMP_SONGS_DATA = new Array(6).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Song Name",
  artist: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=" + i,
  duration: 150,
}));

const TopMusic = () => {
  const songs = TEMP_SONGS_DATA;
  return (
    <div className={styles.container}>
      <div>
        <Title order={4} weight={800}>
          Hello, Jerry 👋
        </Title>
        <Text weight={500} color="primary.2" className="-tracking-[0.04rem]">
          Music to get you started
        </Text>
      </div>
      <div className={styles.songs}>
        {songs.map((song) => (
          <MusicComponent song={song} key={song._id} />
        ))}
      </div>
    </div>
  );
};

export default TopMusic;
