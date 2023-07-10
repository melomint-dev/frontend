import { useRouter } from 'next/router'
import Image from "next/image";
import Link from "next/link";
import { Title, Text } from "@mantine/core";
import {
  logo, home, heart, user, logout
} from "@/assets/general";

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
        <Text weight={500} size="sm" color="var(--ternary-color)" className={styles.gold}>
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
          <div className={styles.text + " " + (router.pathname==="/player" ? styles.textActive : "")}>
            <Image src={home} alt="" />
            <Link href="/player" color="primary">
              Home
            </Link>
          </div>
          <div className={styles.text + " " + (router.pathname==="/player/favourites" ? styles.textActive : "")}>
            <Image src={heart} alt="" />
            <Link href="/player/favourites" color="primary">
              Favourites
            </Link>
          </div>
          <div className={styles.text + " " + (router.pathname==="/player/profile" ? styles.textActive : "")}>
            <Image src={user} alt="" />
            <Link href="/player/profile" color="primary">
              Profile
            </Link>
          </div>
          <div className={styles.text}>
            <Image src={logout} alt="" />
            <Link href="" color="primary">
              Log Out
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.albumCover}>
        <Image src="https://picsum.photos/200/200" alt="" height={200} width={200} className={styles.photo}>
        </Image>
      </div>

    </div>
  );
}

export default Sidebar;
