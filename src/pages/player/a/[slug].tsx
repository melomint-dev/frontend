import Layout from "@/components/general/Layout";
import React from "react";
import TopMusic from "@/components/player/TopMusic";
import TopArtist from "@/components/player/TopArtist";
import AuthorProfile from "@/components/player/author/AuthorProfileCover";

function ArtistProfile() {
  return (
    <Layout
      childern={
        <div>
          <AuthorProfile
            artist={{
              name: "Jigardan Gadhvi",
              image:
                "https://i.scdn.co/image/ab6761860000101648db44742bf21308f4ece612",
              nft: {
                src: "https://static.toiimg.com/photo/msid-75250578/75250578.jpg",
                price: 5,
                priceUnit: "FLOW",
              },
              membersCount: 13498,
            }}
          />
        </div>
      }
    />
  );
}

export default ArtistProfile;
