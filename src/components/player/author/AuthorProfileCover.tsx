import {useEffect, useState} from "react";
import Image from "next/image";
import { Title, Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import styles from "./AuthorProfile.module.css";
import { buyNFTFetcher } from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/utils/notifications.helper";
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
  const router = useRouter();
  const [artistId, setArtistId] = useState(router.query.slug as string);

  useEffect(() => {
    setArtistId(router.query.slug as string);
  }, [router.query.slug]);

  const { trigger: buyNFT, isMutating } = useSWRMutation(
    SWR_CONSTANTS.BUY_NFT,
    buyNFTFetcher
  );

  const handleBuyNFT = async () => {
    try {
      const data = await buyNFT({
        amount: artist.nft.price,
        artistID: artistId,
      });
      console.log("UPDATE-IMAGE -- SUCCESS");
      showSuccessNotification("Image updated successfully");
    } catch (err) {
      console.log(err);
      showErrorNotification("Error updating image");
    }
  };

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
        <Title order={1} weight={"800"}>
          {artist.name}
        </Title>
        <div className={styles.authorProfileInfoNFT}>
          <Button
            color="secondary"
            variant="filled"
            size="md"
            radius={"xl"}
            onClick={handleBuyNFT}
          >
            Join Membership {artist.nft.price} {artist.nft.priceUnit}
          </Button>
          <Text>{artist.membersCount} Members</Text>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;
