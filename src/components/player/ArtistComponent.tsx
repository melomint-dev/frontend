import styles from "./ArtistComponent.module.css";
import Image from "next/image";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { IUser } from "@/hooks/person.swr";
import API_CONSTANTS from "@/utils/apiConstants";

const ArtistComponent = ({ artist }: { artist: IUser }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/player/a/${artist.id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
      <Image
        src={API_CONSTANTS.IPFS_BASE_URL + artist.img}
        alt=""
        height={625}
        width={625}
        className={styles.artistImage}
      />
      <Text
        weight={700}
        align="center"
        color="primary"
        className={styles.artistName}
      >
        {artist.firstName + " " + artist.lastName}
      </Text>
    </div>
  );
};

export default ArtistComponent;
