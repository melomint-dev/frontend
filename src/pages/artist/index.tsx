import { useState, useEffect } from "react";
import Layout from "@/components/artist/Layout";
import styles from "@/styles/artist/Artist.module.css";
import {
  Title,
  Text,
  Button,
  Modal,
  NumberInput,
  Skeleton,
} from "@mantine/core";
import { flowicon } from "@/assets/player";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import UploadModalComp from "@/components/artist/dashboard/UploadModalComp";
import SongResult from "@/components/artist/SongResult";

import transactionService from "@/services/transaction.service";
import { shortenAddress } from "@/utils/shortenAddress";

import { useUser, upadtePriceFetcher } from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications.helper";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const ArtistImageStyles = {
  borderRadius: "1.5rem",
};

const MembershipSection = ({ price }: { price: number }) => {
  const artistData = ARTIST_DATA;

  const [nftPrice, setNftPrice] = useState<number>(
    parseFloat(price?.toString())
  );

  useEffect(() => {
    setNftPrice(parseFloat(price?.toString()));
  }, [price]);

  const { trigger: priceUpdate, isMutating } = useSWRMutation(
    SWR_CONSTANTS.AUTHENTICATE_USER,
    upadtePriceFetcher
  );

  const updatePrice = async () => {
    try {
      const data = await priceUpdate({
        price: nftPrice,
      });
      console.log("UPDATE-PRICE -- SUCCESS", data);
      showSuccessNotification("Price updated successfully");
    } catch (error) {
      console.log("UPDATE-PRICE -- FAILED", error);
      showErrorNotification("Price update failed", "Please try again!");
    }
    // const data = await transactionService.updateNFTPrice({ price: nftPrice });
    // console.log(data);
  };

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
          <Button
            color="secondary"
            variant="filled"
            size="md"
            radius={"xl"}
            onClick={updatePrice}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const TopSection = ({
  name,
  address,
  isUserDataLoading,
}: {
  name: String;
  address: String;
  isUserDataLoading: boolean;
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
        {!isUserDataLoading ? (
          <Title color="primary" order={1} weight={800}>
            {name}
          </Title>
        ) : (
          <Skeleton width={200} height={50} />
        )}
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
          {!isUserDataLoading ? (
            <Text color="primary" weight={700}>
              {shortenAddress(address)}
            </Text>
          ) : (
            <Skeleton width={200} height={20} />
          )}
        </div>
      </div>
    </div>
  );
};

const Artist = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();

  return (
    <>
      <Layout
        childern={
          <div className={styles.container}>
            <Title order={1} weight={800} color="primary">
              Profile
            </Title>
            <TopSection
              name={userData?.firstName + " " + userData?.lastName}
              address={userData?.id}
              isUserDataLoading={isUserDataLoading || errorFetchingUserData}
            />
            <MembershipSection price={userData?.NFTprice} />
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
