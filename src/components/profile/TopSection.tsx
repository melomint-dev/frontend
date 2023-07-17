import styles from "./TopSection.module.css";
import Image from "next/image";
import { Title, Text, Button, FileButton } from "@mantine/core";
import { flowicon } from "@/assets/player";
import { useEffect, useRef, useState } from "react";
import DefaultProfileImage from "@/assets/player/profile/DefaultProfileImage.svg";

const TopSection = ({
  artist,
  isUserDataLoading,
  profileImage,
}: {
  artist: {
    name: string;
    image: string;
    loginMethod: string;
    address: string;
  };
  isUserDataLoading: boolean;
  profileImage: string;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [profileImageSrc, setProfileImageSrc] = useState<string>(profileImage);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {
    setProfileImageSrc(profileImage);
  }, [profileImage]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file as File);
    } else {
      setProfileImageSrc(profileImage);
    }
  }, [file]);
  return (
    <div className={styles.container}>
      {/* <Image
        src={artist.image}
        alt=""
      /> */}
      <div className={styles.profileImage}>
        <FileButton
          resetRef={resetRef}
          onChange={setFile}
          accept="image/png,image/jpeg"
        >
          {(props) => (
            <Image
              src={profileImageSrc ? profileImageSrc : DefaultProfileImage}
              alt="Profile Picture"
              height={150}
              width={150}
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
          >
            Save
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
      <div className={styles.userInfo}>
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
