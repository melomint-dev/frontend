import styles from "@/styles/player/Profile.module.css";
import Layout from "@/components/general/Layout";
import TopSection from "@/components/profile/TopSection";
import ManageSubscription from "@/components/profile/ManageSubscription";
import BuySubscription from "@/components/profile/BuySubscription";
import DisplayArtist from "@/components/player/DisplayArtist";

import { useUser, upadtePriceFetcher } from "@/hooks/person.swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import useSWRMutation from "swr/mutation";
import { user } from "@/assets/general";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const Profile = () => {
  const { userData, isUserDataLoading, errorFetchingUserData } = useUser();

  // console.log(userData.subscriptionTill);

  // chnage this to subscriptionTill to get the date
  const date = new Date().getDate() + 2;
  console.log(date);

  return (
    <Layout
      childern={
        <div className={styles.container}>
          <TopSection
            isUserDataLoading={isUserDataLoading || errorFetchingUserData}
            profileImage={userData?.img}
            name={userData?.firstName + " " + userData?.lastName}
            address={userData?.id}
          />
          {new Date(userData?.subscriptionTill).getTime() > Date.now() ? (
            <ManageSubscription
              subscription={{ amount: 50, expDate: "1 Jul 2024" }}
            />
          ) : (
            <BuySubscription subscription={{ amount: 50 }} />
          )}
          <DisplayArtist
            title="Artists NFT"
            subtitle="These are the NFT of the artists you have joined membership of. Get access to their exclusive content earlier"
          />
        </div>
      }
    />
  );
};

export default Profile;
