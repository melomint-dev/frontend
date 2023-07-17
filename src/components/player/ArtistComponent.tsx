import styles from "./ArtistComponent.module.css";
import Image from "next/image";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";


const ArtistComponent = ({
  artist,
}: {
  artist: {
    _id: string;
    name: string;
    image: string;
  };
}) => {

  const router = useRouter();

  const handleClick = () => {
    router.push(`/player/a/${artist._id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
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
