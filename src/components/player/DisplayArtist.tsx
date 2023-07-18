import styles from "./DisplayArtist.module.css";
import { Title, Text, Skeleton } from "@mantine/core";
import ArtistComponent from "./ArtistComponent";
import { user } from "@/assets/player";
import { useArtistsOnRise } from "@/hooks/abstractions.flow.swr";
import { IUser } from "@/interfaces/IUser";

const TEMP_ARTIST_DATA = new Array(6).fill({}).map((_, i) => ({
  _id: "0x482c030acfdcb4cc",
  name: "Artist Name",
  image: "https://picsum.photos/300/300?random=" + i,
}));

const TopArtist = ({
  title,
  subtitle,
  artists,
  isLoading,
}: {
  title?: string;
  subtitle?: string;
  artists: IUser[];
  isLoading: boolean;
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
        {isLoading ? (
          <Skeleton height={133} width={400} />
        ) : (
          artists.map((artist) => (
            <ArtistComponent key={artist.id} artist={artist} />
          ))
        )}
      </div>
    </div>
  );
};

export default TopArtist;
