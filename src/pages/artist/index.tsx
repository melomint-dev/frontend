import { useState, useEffect, useRef } from "react";
import Layout from "@/components/artist/Layout";
import styles from "@/styles/artist/Artist.module.css";
import {
  Title,
  Text,
  Button,
  Modal,
  NumberInput,
  Skeleton,
  FileButton,
} from "@mantine/core";
import { flowicon } from "@/assets/player";
import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import UploadModalComp from "@/components/artist/dashboard/UploadModalComp";
import SongResult from "@/components/artist/SongResult";

import DefaultNFTImage from "@/assets/artist/DefaultNFTImage.svg";
import DefaultCoverImage from "@/assets/artist/DefaultCoverImage.svg";

import transactionService from "@/services/transaction.service";
import { shortenAddress } from "@/utils/shortenAddress";

import {
  useUser,
  upadtePriceFetcher,
  updateImageFetcher,
} from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications.helper";

import API_CONSTANTS from "@/utils/apiConstants";

const MembershipSection = ({
  price,
  isLoading,
  nftImage,
}: {
  price: number;
  isLoading: boolean;
  nftImage: string;
}) => {
  const [nftPrice, setNftPrice] = useState<number>(
    parseFloat((price ?? 0).toString())
  );
  const [file, setFile] = useState<File | null>(null);
  const [nftImageSrc, setNftImageSrc] = useState<string>(nftImage);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {
    setNftPrice(parseFloat((price ?? 0).toString()));
  }, [price]);

  useEffect(() => {
    setNftImageSrc(nftImage);
  }, [nftImage]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNftImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file as File);
    }
  }, [file]);

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
  };

  return (
    <div className={styles.membership}>
      <Title order={3} weight={800} color="primary">
        Membership(NFT) Info
      </Title>
      <div className={styles.membershipInfo}>
        <FileButton
          resetRef={resetRef}
          onChange={setFile}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Image
              src={nftImageSrc ? nftImageSrc : DefaultNFTImage}
              alt="NFT Preview"
              height={150}
              width={120}
              placeholder="empty"
              className={styles.imgSelector}
              priority
              {...props}
            />
          )}
        </FileButton>

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
            disabled={isLoading || isMutating}
            type="number"
            onChange={(value) => setNftPrice(value as number)}
          />
          <Button
            color="secondary"
            variant="filled"
            size="md"
            radius={"xl"}
            onClick={updatePrice}
            disabled={isLoading}
            loading={isMutating}
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
  coverImage,
}: {
  name: string;
  address: string;
  isUserDataLoading: boolean;
  coverImage: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [coverImageSrc, setCoverImageSrc] = useState<string>(
    coverImage ? API_CONSTANTS.IPFS_BASE_URL + coverImage : ""
  );
  const resetRef = useRef<() => void>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>("");

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {
    setCoverImageSrc(
      coverImage ? API_CONSTANTS.IPFS_BASE_URL + coverImage : ""
    );
  }, [coverImage]);

  useEffect(() => {
    console.log(coverImageSrc);
  }, [coverImageSrc]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file as File);
    } else {
      setCoverImageSrc(
        coverImage ? API_CONSTANTS.IPFS_BASE_URL + coverImage : ""
      );
    }
  }, [file]);

  const { trigger: updateImage, isMutating } = useSWRMutation(
    SWR_CONSTANTS.AUTHENTICATE_USER,
    updateImageFetcher
  );

  const uploadImage = async () => {
    try {
      const data = await updateImage({
        file: file as File,
      });
      console.log("UPDATE-IMAGE -- SUCCESS", data);
      showSuccessNotification("Image updated successfully");
    } catch (error) {
      console.log("UPDATE-IMAGE -- FAILED", error);
      showErrorNotification("Image update failed", "Please try again!");
    }
  };

  console.log("COVER-IMAGE-SRC", coverImageSrc);

  return (
    <div className={styles.artist}>
      <div className={styles.artistCover}>
        <FileButton
          resetRef={resetRef}
          onChange={setFile}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Image
              src={coverImageSrc ? coverImageSrc : DefaultCoverImage}
              alt=""
              height={150}
              width={400}
              className={styles.imgSelector}
              priority
              {...props}
            />
          )}
        </FileButton>
        <div className={styles.saveButtons}>
          <Button
            color="secondary"
            variant="filled"
            size="md"
            // radius={"xl"}
            disabled={isUserDataLoading || !file}
            fullWidth
            onClick={uploadImage}
          >
            Save Cover
          </Button>
          <Button
            variant="outlined"
            size="md"
            // radius={"xl"}
            color="primary"
            disabled={isUserDataLoading || !file}
            onClick={clearFile}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </div>

      <div className={styles.artistInfo}>
        {!isUserDataLoading ? (
          <Title color="primary" order={1} weight={800}>
            {name}
          </Title>
        ) : (
          <Skeleton width={200} height={62} />
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
              coverImage={userData?.img}
            />
            <MembershipSection
              price={userData?.NFTprice}
              isLoading={isUserDataLoading}
              nftImage={userData?.NFTimage}
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
