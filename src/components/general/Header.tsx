import Image from "next/image";
import styles from "./Header.module.css";
import { TextInput, Text } from "@mantine/core";
import { flowicon, user, search } from "@/assets/player";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import transactionService from "@/services/transaction.service";

function Header() {
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push({
      pathname: "/player",
      query: { search: searchValue },
    });
  };

  const [userName, setUserName] = useState<string>("");

  const address = "0x123456";

  useEffect(() => {
    const getUser = async () => {
      const userAddress = await transactionService.getUserAddress();
      const data = await transactionService.getUserName({ address });
      if (data) {
        setUserName(data);
      }
      // console.log(userAddress);
    };
    getUser();
  }, []);

  return (
    <header className={styles.container}>
      <form onSubmit={handleSearch}>
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
            className={styles.userImage}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
