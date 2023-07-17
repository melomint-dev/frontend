import { Skeleton, Text, Title } from "@mantine/core";
import { user } from "@/assets/player";
import MusicComponent from "./MusicComponent";
import styles from "./TopMusic.module.css";
import { useTrendingSongs } from "@/hooks/abstractions.flow.swr";
import { useUser } from "@/hooks/person.swr";
import { ISong } from "@/interfaces/ISong";

const TopMusic = ({
  songs,
  isLoading,
  title,
  description,
}: {
  songs: ISong[];
  isLoading: boolean;
  title?: string;
  description?: string;
}) => {
  const { userData } = useUser();

  return (
    <div className={styles.container}>
      <div>
        <Title order={4} weight={800}>
          {title ?? (userData ? `Hello, ${userData.firstName} 👋` : "Hello,")}
        </Title>
        <Text weight={500} color="primary.2" className="-tracking-[0.04rem]">
          {description ?? "Music to get you started"}
        </Text>
      </div>
      <div className={styles.songs}>
        {isLoading ? (
          <Skeleton height={200} width={500} />
        ) : (
          songs.map((song) => <MusicComponent song={song} key={song.id} />)
        )}
      </div>
    </div>
  );
};

export default TopMusic;
