import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Title, Text, Button } from "@mantine/core";
import { logo, home, heart, user, logout } from "@/assets/general";

import styles from "./Sidebar.module.css";

function Sidebar() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.logoText}>
        <Image src={logo} alt="" />
        <Title order={5} color="primary" weight={600}>
          MeloMint
        </Title>
        <Text
          weight={500}
          size="sm"
          color="var(--ternary-color)"
          className={styles.gold}
        >
          Gold
        </Text>
      </div>

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

      <div className={styles.albumCover}>
        <Image
          src="https://picsum.photos/200/200"
          alt=""
          fill
          className={styles.photo}
        ></Image>
      </div>
    </div>
  );
}

export default Sidebar;
