import styles from "./MusicComponent.module.css";
import Image, { StaticImageData } from "next/image";
import { Text } from "@mantine/core";

const MusicComponent = ({
  music: { name, image, artist },
}: {
  music: {
    name: string;
    image: StaticImageData | string;
    artist: string;
  };
}) => {
  return (
    <div className={styles.container}>
      <Image src={image} alt="" className={styles.musicImage} />
      <div>
        <Text weight={700} color="primary">
          {name}
        </Text>
        <Text size="sm" weight={400} color="primary.3">
          {artist}
        </Text>
      </div>
    </div>
  );
};

export default MusicComponent;
