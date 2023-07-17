import useSWR, { mutate } from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import personService from "@/services/person.service";
import API_CONSTANTS from "@/utils/apiConstants";

export interface IUser {
  NFTimage: string;
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

export async function updateImageFetcher(
  url: string,
  { arg }: { arg: { file: File } }
) {
  try {
    const formData = new FormData();
    formData.append("image", arg.file as File);

    const res = await fetch(API_CONSTANTS.UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("data", data);

    await personService.updatePersonImage({ url: data.imageHash });
    await mutate(SWR_CONSTANTS.GET_USER);
    return res;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
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
export async function updateLikedSongFetcher(
  url: string,
  { arg }: { arg: { song: string } }
) {
  try {
    return await personService.updatePersonLinkedSong({ song: arg.song });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
