import { Skeleton, Text, Title } from "@mantine/core";
import { user } from "@/assets/player";
import MusicComponent from "./MusicComponent";
import styles from "./TopMusic.module.css";
import { useTrendingSongs } from "@/hooks/abstractions.flow.swr";

const TopMusic = () => {
  const {
    trendingSongsData,
    isTrendingSongsDataLoading,
    errorFetchingTrendingSongsData,
  } = useTrendingSongs();

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
        {isTrendingSongsDataLoading || errorFetchingTrendingSongsData ? (
          <Skeleton height={200} width={500} />
        ) : (
          trendingSongsData.map((song) => (
            <MusicComponent song={song} key={song.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default TopMusic;
