import styles from "./ArtistComponent.module.css";
import Image, { StaticImageData } from "next/image";
import { Text } from "@mantine/core";

const ArtistComponent = ({
  song: { name, image },
}: {
  song: {
    name: string;
    image: StaticImageData | string;
  };
}) => {
  return (
    <div className={styles.container}>
      <Image src={image} alt="" className={styles.artistImage} />
      <Text weight={700} align="center" color="primary" className={styles.artistName}>
        {name}
      </Text>
    </div>
  );
};

export default ArtistComponent;
