import styles from "./Profile.module.css";
import Layout from "@/components/general/Layout";
import TopSection from "@/components/profile/TopSection";
import ManageSubscription from "@/components/profile/ManageSubscription";
import BuySubscription from "@/components/profile/BuySubscription";
import DisplayArtist from "@/components/player/DisplayArtist";

const ARTIST_DATA = {
  name: "Jigardan Gadhvi",
  image: "https://picsum.photos/300/300?random=1",
  loginMethod: "flow",
  address: "0x12345678",
};

const Profile = () => {
  return (
    <Layout
      childern={
        <div className={styles.container}>
          <TopSection artist={ARTIST_DATA} />
          <ManageSubscription subscription={{ amount: 50, expDate: "1 Jul 2024" }} />
          {/* <BuySubscription subscription={{ amount: 50 }} /> */}
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
