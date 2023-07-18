import useSWR, { mutate } from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import personService from "@/services/person.service";
import API_CONSTANTS from "@/utils/apiConstants";
import { IUser } from "@/interfaces/IUser";
import * as fcl from "@onflow/fcl";

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

export async function upadteNFTFetcher(
  url: string,
  { arg }: { arg: { newPrice: number; file: File } }
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

    await personService.updateNFT({
      newPrice: arg.newPrice,
      newUrl: data.imageHash,
    });
    await mutate(SWR_CONSTANTS.GET_USER);
    return true;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

export async function buyNFTFetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      amount: number;
      artistID: string;
    };
  }
) {
  try {

    const userAcc = await fcl.currentUser().snapshot();
    console.log("userAcc", userAcc);

    const formData = {
      "userId": userAcc.addr,
      "artistId": arg.artistID,
    };

    console.log("formData", formData);

    const res = await fetch(API_CONSTANTS.BUY_NFT, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data", data);

    await personService.buyNFT({
      amount: arg.amount,
      artistID: arg.artistID,
    });
    await mutate(SWR_CONSTANTS.GET_USER);
    return true;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}

export function usePeopleList(list: string[]) {
  const { data, error, isLoading } = useSWR(
    [SWR_CONSTANTS.GET_USER, list],
    personService.getListOfPeopleByIds
  );

  return {
    peopleListData: data as IUser[],
    isPeopleListDataLoading: isLoading as boolean,
    errorFetchingPeopleListData: error,
  };
}

export async function buySubscriptionFetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      amount: number;
      artistID: string;
    };
  }
) {
  try {

    const userAcc = await fcl.currentUser().snapshot();
    console.log("userAcc", userAcc);

    const formData = {
      "userId": userAcc.addr,
      "additionalTime": parseFloat((60*60*24*15).toString()).toString(),
    };

    console.log("formData", formData);

    const res = await fetch(API_CONSTANTS.BUY_SUBSCRIPTION, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log("data", data);

    await personService.buyNFT({
      amount: arg.amount,
      artistID: arg.artistID,
    });
    await mutate(SWR_CONSTANTS.GET_USER);
    return true;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}


