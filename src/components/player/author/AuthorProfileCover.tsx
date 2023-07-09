import React from "react";
import Image from "next/image";
import { Title, Button, Text } from "@mantine/core";

import styles from "./AuthorProfile.module.css";

function AuthorProfile({
  artist,
}: {
  artist: {
    name: string;
    image: string;
    nft: {
      src: string;
      price: number;
      priceUnit: "FLOW" | "USD";
    };
    membersCount: number;
  };
}) {
  return (
    <div className={styles.container}>
      <div className={styles.authorProfileImageWrapper}>
        <Image
          src={artist.image}
          alt={artist.name}
          fill
          className={styles.authorProfileImage}
        />
        <div className={styles.authorProfileImageScrim} />
      </div>
      <div className={styles.authorProfileInfo}>
        <Title order={2} weight={"800"}>
          {artist.name}
        </Title>
        <div className={styles.authorProfileInfoNFT}>
          <Button color="secondary" variant="filled" size="md" radius={"xl"}>
            Join Membership {artist.nft.price} {artist.nft.priceUnit}
          </Button>
          <Text>{artist.membersCount} Members</Text>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
