import styles from "./MusicComponent.module.css";
import Image from "next/image";
import { Text } from "@mantine/core";

const MusicComponent = ({
  song,
  showFull = false,
}: {
  song: {
    _id: string;
    name: string;
    artist: string;
    image: string;
    duration: number;
  };
  showFull?: boolean;
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={song.image}
        height={56}
        width={56}
        alt=""
        className={styles.musicImage}
      />
      <div>
        <Text weight={700} color="primary">
          {song.name}
        </Text>
        <Text size="sm" weight={500} color="primary.3">
          {song.artist}
        </Text>
      </div>
      {showFull && (
        <Text size="sm" weight={400} color="primary.3">
          {new Date(song.duration * 1000).toISOString().substr(14, 5)}
        </Text>
      )}
    </div>
  );
};

export default MusicComponent;
