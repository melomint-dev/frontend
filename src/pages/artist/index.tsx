import { useState, useEffect } from "react";
import Layout from "@/components/artist/Layout";
import styles from "@/styles/artist/Artist.module.css";
import { Title, Text, TextInput, Button, Modal, NumberInput } from "@mantine/core";
import { flowicon } from "@/assets/player";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import UploadModalComp from "@/components/artist/dashboard/UploadModalComp";
import SongResult from "@/components/artist/SongResult";

import scriptService from "@/services/script.service";
import transactionService from "@/services/transaction.service";
import { type } from "os";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const ArtistImageStyles = {
  borderRadius: "1.5rem",
};

const MembershipSection = ({price} : {
  price: number
}) => {
  const artistData = ARTIST_DATA;

  const [nftPrice, setNftPrice] = useState<number>(parseFloat(price.toString()));
  
  useEffect(() => {
    setNftPrice(parseFloat(price.toString()));
  }, [price]);
  
  const priceUpdate = async () => {
    const data = await transactionService.updateNFTPrice({ price: nftPrice });
    console.log(data);
  }

  return (
    <div className={styles.membership}>
      <Title order={3} weight={800} color="primary">
        Membership(NFT) Info
      </Title>
      <div className={styles.membershipInfo}>
        <Image
          src={artistData.image}
          alt=""
          height={150}
          width={120}
          style={ArtistImageStyles}
        />
        <div className={styles.membershipInput}>
          <NumberInput
            classNames={{ input: styles.search }}
            variant="disabled"
            placeholder="Search"
            size="md"
            color="primary.3"
            icon={<Image src={flowicon} alt="" height={20} width={20} />}
            value={nftPrice}
            min={0}
            onChange={(value) => setNftPrice(value as number)}
          />
          <Button color="secondary" variant="filled" size="md" radius={"xl"} onClick={priceUpdate}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const TopSection = ({name, address} : {
  name: string,
  address: string
}) => {
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
          {name}
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
            {address}
          </Text>
        </div>
      </div>
    </div>
  );
};

const Artist = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [userInfo, setUserInfo] = useState<any>({
    name: "",
    address: "",
    nftPrice: 0,
  });

  useEffect(() => {
    (async () => {
      const address = await transactionService.getUserAddress();
      const data = await scriptService._getCreator({ address });
      if (data) {
        setUserInfo(
          Object.assign({}, userInfo, {
            name: data.name,
            address: data.creatorAddress,
            nftPrice: data.price,
          })
        );
      }
    })();
  }, []);

  return (
    <>
      <Layout
        childern={
          <div className={styles.container}>
            <Title order={1} weight={800} color="primary">
              Profile
            </Title>
            <TopSection 
              name={userInfo.name}
              address={userInfo.address}
            />
            <MembershipSection
              price={userInfo.nftPrice}
            />
            <SongResult openUploadModal={open} />
          </div>
        }
      />
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <UploadModalComp />
      </Modal>
    </>
  );
};

export default Artist;
