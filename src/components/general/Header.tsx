import Image from "next/image";
import styles from "./Header.module.css";
import { TextInput, Text, Skeleton } from "@mantine/core";
import { flowicon, user, search } from "@/assets/player";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/person.swr";
import API_CONSTANTS from "@/utils/apiConstants";
import Link from "next/link";

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

  const imageURL =
    API_CONSTANTS.IPFS_BASE_URL +
    (userData?.img
      ? userData?.img
      : "QmeH9LwG8ToFrxvETRpYK6YTDpVNj8K6VdnqD1Kvhu2frV");

      console.log(imageURL);

  useEffect(() => {
    if (router.query.search) {
      setSearchValue(router.query.search as string);
    } else {
      setSearchValue("");
    }
  }, [router.query.search]);

  return (
    <header className={styles.container}>
      <form onSubmit={handleSearch}>
        <TextInput
          classNames={{ input: styles.search }}
          variant="filled"
          placeholder="Search"
          size="md"
          icon={<Image src={search} alt="" height={20} width={20} />}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />
      </form>
      {!isUserDataLoading && !errorFetchingUserData && userData ? (
        <Link
          className={styles.user}
          href={userData.type == "1" ? "/artist" : "/player/profile"}
        >
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
              src={imageURL}
              alt="User Image"
              height={42}
              width={42}
              className={styles.userImage}
            />
          </div>
        </Link>
      ) : (
        <Skeleton height={42} width={180} />
      )}
    </header>
  );
}

export default Header;
