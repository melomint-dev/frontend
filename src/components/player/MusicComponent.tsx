import styles from "./MusicComponent.module.css";
import Image from "next/image";
import { user } from "@/assets/player";
import { Text } from "@mantine/core";

const MusicComponent = () => {
  return (
    <div className={styles.container}>
      <Image src={user} alt="" className={styles.musicImage} />
      <div>
        <Text weight={700} color="primary"> Tempore eos ipsam</Text>
        <Text size="sm" weight={400} color="primary.3">Lonnie Krajcik</Text>
      </div>
    </div>
  );
};

export default MusicComponent;
