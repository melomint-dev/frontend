import Image from "next/image";
import styles from "./Header.module.css";
import { TextInput, Text, Skeleton } from "@mantine/core";
import { flowicon, user, search } from "@/assets/player";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "@/hooks/person.swr";

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

  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();

  // return <></>;

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
      {!isUserDataLoading && !errorFetchingUserData && userData ? (
        <div className={styles.user}>
          <Text size="lg" weight="700">
            {userData.firstName + " " + userData.lastName}
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
      ) : (
        <Skeleton height={42} width={180} />
      )}
    </header>
  );
}

export default Header;
