import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";
import { logo, home, heart, user, logout } from "@/assets/general";
import { flowicon } from "@/assets/player";
import styles from "./Sidebar.module.css";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

function Sidebar() {
  const router = useRouter();
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
          <div className={styles.navLink + " " + styles.navLinkWarn}>
            <Image src={logout} alt="" />
            <Text weight={600}>Log Out</Text>
          </div>
        </div>
      </div>

      {router.pathname === "/artist" ||
      router.pathname === "/artist/dashboard" ? (
        <div className={styles.artistInfo}>
          <Image
            src="https://picsum.photos/200/200"
            alt=""
            width={40}
            height={40}
            className={styles.artistPhoto}
          />
          <div className={styles.artistInfoText}>
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
      ) : (
        <div className={styles.albumCover}>
          <Image
            src="https://picsum.photos/200/200"
            alt=""
            fill
            className={styles.photo}
          ></Image>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
