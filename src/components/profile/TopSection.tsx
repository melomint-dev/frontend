import styles from "./TopSection.module.css";
import Image from "next/image";
import { Title, Text } from "@mantine/core";
import { flowicon } from "@/assets/player";

const ArtistImageStyles = {
  borderRadius: "1.5rem",
};

const TopSection = ({
  artist,
}: {
  artist: {
    name: string;
    image: string;
    loginMethod: string;
    address: string;
  };
}) => {
  return (
    <div className={styles.container}>
      <Image
        src={artist.image}
        alt=""
        height={150}
        width={150}
        style={ArtistImageStyles}
      />
      <div className={styles.artistInfo}>
        <Title color="primary" order={1} weight={800}>
          {artist.name}
        </Title>
        <div className={styles.info}>
          <Text color="primary.3" weight={500}>
            Login Method
          </Text>
          <Image src={flowicon} alt=""></Image>
        </div>
        <div className={styles.info}>
          <Text color="primary.3" weight={500}>
          Wallet Address:
          </Text>
          <Text color="primary" weight={700}>
            {artist.address}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default TopSection;
