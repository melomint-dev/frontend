import Image from "next/image";
import styles from "./Header.module.css";
import { TextInput, Text } from "@mantine/core";
import { flowicon, user, search } from "@/assets/player";
import { useRouter } from "next/router";
import { useState } from "react";

const userImageStyle = {
  borderRadius: "14px",
};

const flowiconStyle = {
  position: "absolute",
  top: "-0.5rem",
  left: "-0.5rem",
};

function Header() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = (e: any) => {
    e.preventDefault();
    router.push(
      {
        query: { search: searchValue },
      },
      `/search?=${searchValue}`
    );
  };

  return (
    <header className={styles.container}>
      <form onSubmit={handleSearchClick}>
        <TextInput
          classNames={{ input: styles.search }}
          variant="filled"
          placeholder="Search"
          size="md"
          icon={<Image src={search} alt="" height={20} width={20} />}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />
      </form>
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
            style={userImageStyle}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
