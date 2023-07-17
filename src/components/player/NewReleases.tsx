import styles from "./NewReleases.module.css";
import { Title, Text } from "@mantine/core";
import NewSongComponents from "./NewSongComponents";
import { user } from "@/assets/player";

const NewReleases = () => {
  return (
    <div className={styles.container}>
      <Title order={5} weight={700}>
        New Releases
      </Title>
      <div className={styles.songs}>
        <NewSongComponents 
          song={{
            _id: "1",
            name: "Song Name",
            image: user,
            artist: "Artist Name",
          }}
        />
        <NewSongComponents 
          song={{
            _id: "2",
            name: "Song Name",
            image: user,
            artist: "Artist Name",
          }}
        />
        <NewSongComponents 
          song={{
            _id: "3",
            name: "Song Name",
            image: user,
            artist: "Artist Name",
          }}
        />
      </div>
    </div>
  );
};

export default NewReleases;
