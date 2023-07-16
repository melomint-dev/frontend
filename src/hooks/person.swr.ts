import useSWR from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import personService from "@/services/person.service";

interface IUser {
  NFTprice: number;
  firstName: String;
  id: String;
  img: String;
  lastName: String;
  likedSongs: {
    [key: string]: boolean;
  };
  recentlyHeard: String[];
  revenue: String;
  songsPublished: {
    [key: string]: boolean;
  };
  subscribedTo: {
    [key: string]: boolean;
  };
  subscribers: {
    [key: string]: boolean;
  };
  subscriptionTill: String;
  type: String;
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
