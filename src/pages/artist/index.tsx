import Layout from "@/components/artist/Layout";
import styles from "./Artist.module.css";
import { Title, Text } from "@mantine/core";
import { flowicon } from "@/assets/player";
import Image from "next/image";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const ArtistImageStyles = {
  borderRadius: "1.5rem",
};

const Artist = () => {
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <Title order={1} weight={800} color="primary">
            Profile
          </Title>
          <div className={styles.artist}>
            <Image
              src={ARTIST_DATA.image}
              alt=""
              height={150}
              width={400}
              style={ArtistImageStyles}
            />
            <div className={styles.artistInfo}>
              <Title color="primary" order={1} weight={800}>
                {ARTIST_DATA.name}
              </Title>
              <div className={styles.info}>
                <Text color="primary.3" weight={500}>
                  Login Method
                </Text>
                <Image src={flowicon} alt="" />
              </div>
              <div className={styles.info}>
                <Text color="primary.3" weight={500}>
                  Wallet Address:
                </Text>
                <Text color="primary" weight={700}>
                  {ARTIST_DATA.address}
                </Text>
              </div>
            </div>
          </div>

          <div className={styles.membership}>

          </div>


        </div>
      }
    />
  );
};

export default Artist;
