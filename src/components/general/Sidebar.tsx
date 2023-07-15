import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";
import { logo, home, heart, user, logout } from "@/assets/general";
import { flowicon } from "@/assets/player";
import styles from "./Sidebar.module.css";
import * as fcl from "@onflow/fcl";
import scriptService from "@/services/script.service";
import transactionService from "@/services/transaction.service";
import { shortenAddress } from "@/utils/shortenAddress";


const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const artistPhotoStyle = {
  borderRadius: "0.75rem",
};

const ArtistInfo = () => {
  const [artistInfo, setArtistInfo] = useState<any>({
    name: "",
    address: "",
  });

  useEffect(() => {
    (async () => {
      const address = await transactionService.getUserAddress();
      const data = await scriptService._getCreator({ address });
      if (data) {
        setArtistInfo(
          Object.assign({}, artistInfo, {
            name: data.name,
            address: data.creatorAddress,
          })
        );
      }
    })();
  }, []);

  return (
    <div className={styles.artistInfo}>
      <Image
        src="https://picsum.photos/200/200"
        alt=""
        width={40}
        height={40}
        style={artistPhotoStyle}
      />
      <div className={styles.artistInfoText}>
        <Title order={4} weight={800} color="primary">
          {artistInfo.name}
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
            {shortenAddress(artistInfo.address)}
          </Text>
        </div>
      </div>
    </div>
  );
};

function Sidebar() {
  const router = useRouter();

  const logOut = () => {
    fcl.unauthenticate();
    router.push("/");
  };

  return (
    <div className={styles.container}>
      <Link href={"/"} className={styles.logoText}>
        <Image src={logo} alt="" />
        <Text
          weight={500}
          size="sm"
          color="var(--ternary-color)"
          className={styles.gold}
        >
          Gold
        </Text>
      </Link>

      <div className={styles.menu}>
        <div className={styles.menuText}>
          <Text color="primary.2" weight={400}>
            Menu
          </Text>
        </div>
        <div className={styles.menuList}>
          <Link
            className={
              styles.navLink +
              " " +
              (router.pathname === "/player" ? styles.navLinkActive : "")
            }
            href="/player"
          >
            <Image src={home} alt="" />
            <Text weight={600}>Home</Text>
          </Link>
          <Link
            className={
              styles.navLink +
              " " +
              (router.pathname === "/player/favourites"
                ? styles.navLinkActive
                : "")
            }
            href="/player/favourites"
          >
            <Image src={heart} alt="" />
            <Text weight={600}>Favourites</Text>
          </Link>
          <Link
            className={
              styles.navLink +
              " " +
              (router.pathname === "/player/profile"
                ? styles.navLinkActive
                : "")
            }
            href="/player/profile"
          >
            <Image src={user} alt="" />
            <Text weight={600}>Profile</Text>
          </Link>
          <div
            className={styles.navLink + " " + styles.navLinkWarn}
            onClick={logOut}
          >
            <Image src={logout} alt="" />
            <Text weight={600}>Log Out</Text>
          </div>
        </div>
      </div>

      {router.pathname === "/artist" ||
      router.pathname === "/artist/dashboard" ? (
        <ArtistInfo />
      ) : (
        <div className={styles.albumCover}>
          <Image
            src="https://picsum.photos/200/200"
            alt=""
            fill
            className={styles.photo}
          />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
