import Image from "next/image";
import styles from "./Header.module.css";
import { TextInput, Text } from "@mantine/core";
import { flowicon, user, search } from "@/assets/player";

function Header() {
  return (
    <header className={styles.container}>
      <TextInput
        classNames={{ input: styles.search }}
        variant="filled"
        placeholder="Search"
        size="md"
        icon={<Image src={search} alt="" height={20} width={20} />}
      />
      <div className={styles.user}>
        <Text size="lg" weight="700">
          Raj Varsani
        </Text>
        <div className={styles.userImageWithFlow}>
          <div className={styles.flowIcon}>
            <Image
              src={flowicon}
              alt=""
              height={20}
              width={20}
              // style={flowiconStyle}
            />
          </div>
          <Image
            src={user}
            alt=""
            height={42}
            width={42}
            className={styles.userImage}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
