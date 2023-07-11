import Layout from "@/components/artist/Layout";
import styles from "@/styles/artist/Artist.module.css";
import { Title, Text, TextInput, Button } from "@mantine/core";
import { flowicon } from "@/assets/player";
import Image from "next/image";

import SongResult from "@/components/artist/SongResult";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const ArtistImageStyles = {
  borderRadius: "1.5rem",
};

const MembershipSection = () => {
  return (
    <div className={styles.membership}>
      <Title order={3} weight={800} color="primary">
        Membership(NFT) Info
      </Title>
      <div className={styles.membershipInfo}>
        <Image
          src={ARTIST_DATA.image}
          alt=""
          height={150}
          width={120}
          style={ArtistImageStyles}
        />
        <div className={styles.membershipInput}>
          <TextInput
            classNames={{ input: styles.search }}
            variant="disabled"
            placeholder="Search"
            size="md"
            color="primary.3"
            icon={<Image src={flowicon} alt="" height={20} width={20} />}
          />
          <Button color="secondary" variant="filled" size="md" radius={"xl"}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const TopSection = () => {
  return (
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
  );
};

const Artist = () => {
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <Title order={1} weight={800} color="primary">
            Profile
          </Title>

          <TopSection />
          <MembershipSection />
          <SongResult />
        </div>
      }
    />
  );
};

export default Artist;
