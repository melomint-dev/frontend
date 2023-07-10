import styles from "./DisplayArtist.module.css";
import { Title, Text } from "@mantine/core";
import ArtistComponent from "./ArtistComponent";
import { user } from "@/assets/player";

const TEMP_ARTIST_DATA = new Array(6).fill({}).map((_, i) => ({
  _id: i.toString(),
  name: "Artist Name",
  image: "https://picsum.photos/300/300?random=" + i,
}));

const TopArtist = ({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <Title order={5} weight={700} color="primary">
          {title}
        </Title>
        <Text weight={500} color="primary.2" lineClamp={2}>
          {subtitle}
        </Text>
      </div>
      <div className={styles.artists}>
        {TEMP_ARTIST_DATA.map((artist) => (
          <ArtistComponent artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default TopArtist;
