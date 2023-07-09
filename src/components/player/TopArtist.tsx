import styles from "./TopArtist.module.css";
import { Title } from "@mantine/core";
import ArtistComponent from "./ArtistComponent";
import { user } from "@/assets/player";

const TopArtist = () => {
  return (
    <div className={styles.container}>
      <Title order={5} weight={700}>
        Artists on Rise
      </Title>
      <div className={styles.artists}>
        <ArtistComponent 
          song={{
            name: "The Weeknd",
            image: user,
          }}
        />
        <ArtistComponent
          song={{
            name: "The Weeknd",
            image: user,
          }}
        />
        <ArtistComponent 
          song={{
            name: "The Weeknd",
            image: user,
          }}
        />
      </div>
    </div>
  );
};

export default TopArtist;
