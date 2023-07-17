import useSWR from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import personService from "@/services/person.service";

interface IUser {
  NFTprice: number;
  firstName: string;
  id: string;
  img: string;
  lastName: string;
  likedSongs: {
    [key: string]: boolean;
  };
  recentlyHeard: string[];
  revenue: string;
  songsPublished: {
    [key: string]: boolean;
  };
  subscribedTo: {
    [key: string]: boolean;
  };
  subscribers: {
    [key: string]: boolean;
  };
  subscriptionTill: string;
  type: string;
}

export function useUser() {
  const { data, error, isLoading } = useSWR(
    SWR_CONSTANTS.GET_USER,
    personService.getPerson
  );

  return {
    userData: data as IUser,
    isUserDataLoading: isLoading as boolean,
    errorFetchingUserData: error,
  };
}

export function useArtist(id: string) {
  const { data, error, isLoading } = useSWR(
    [SWR_CONSTANTS.GET_ARTIST, id],
    personService.getArtist
  );

  return {
    artistData: data as IUser,
    isArtistDataLoading: isLoading as boolean,
    errorFetchingArtistData: error,
  };
}

export async function upadtePriceFetcher(
  url: string,
  { arg }: { arg: { price: number } }
) {
  try {
    return await personService.updateNFTPrice({ price: arg.price });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
