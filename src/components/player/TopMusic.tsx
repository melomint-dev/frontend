import { Text, Title } from "@mantine/core";

import MusicComponent from "./MusicComponent";
import styles from "./TopMusic.module.css";

const TopMusic = () => {
  return (
    <div className="space-y-[2.06rem]">
      <div>
        <Title order={4} weight={800}>
          Hello, Jerry
        </Title>
        <Text weight={500} color="primary.2" className="-tracking-[0.04rem]">
          Music to get you started
        </Text>
      </div>
      <div className={styles.container}>
        <MusicComponent />
        <MusicComponent />
        <MusicComponent />
        <MusicComponent />
      </div>
    </div>
  );
};

export default TopMusic;
