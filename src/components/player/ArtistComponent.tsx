import styles from "./ArtistComponent.module.css";
import Image, { StaticImageData } from "next/image";
import { Text } from "@mantine/core";

const ArtistComponent = ({
  artist,
}: {
  artist: {
    _id: string;
    name: string;
    image: string;
  };
}) => {
  return (
    <div className={styles.container}>
      <Image src={artist.image} alt="" height={625} width={625} className={styles.artistImage} />
      <Text
        weight={700}
        align="center"
        color="primary"
        className={styles.artistName}
      >
        {artist.name}
      </Text>
    </div>
  );
};

export default ArtistComponent;
