import Image from "next/image";
import styles from "./Header.module.css";
import { TextInput, Text } from "@mantine/core";
import { flowicon, user, search } from "@/assets/player";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import transactionService from "@/services/transaction.service";
import scriptService from "@/services/script.service";

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

  useEffect(() => {
    (async () => {
      const address = await transactionService.getUserAddress();
      console.log(address);
      const data = await scriptService._getUserNameByAddress({ address });
      console.log(data);
      if (data) {
        setUserName(data);
      }
    })();
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
          {userName}
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
