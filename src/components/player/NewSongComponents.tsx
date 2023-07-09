import styles from "./NewSongComponents.module.css";

import Image, { StaticImageData } from "next/image";
import { Text } from "@mantine/core";

const NewSongComponents = ({
  song: { name, image, artist },
}: {
  song: {
    name: string;
    image: StaticImageData | string;
    artist: string;
  };
}) => {
  return (
    <div className={styles.container}>
      <Image src={image} alt="" className={styles.songImage} />
      <Text
        weight={700}
        color="primary"
        lineClamp={1}
        className={styles.songName}
      >
        {name}
      </Text>
      <Text weight={700} color="primary.3" className={styles.songArtistName}>
        {artist}
      </Text>
    </div>
  );
};

export default NewSongComponents;
