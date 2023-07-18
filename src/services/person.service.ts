import * as fcl from "@onflow/fcl";
import { singleUserTransaction } from "@/utils/transcation";
import { userScript } from "@/utils/scripts";

import { getPersonByAddressScript } from "@/cadence/scripts";
import {
  updatePersonNFTTransaction,
  updatePersonImgTransaction,
  updatePersonLikedSongTransaction,
  buyNFTTransaction,
} from "@/cadence/transactions";
import { getListOfPeopleByIdsScript } from "@/cadence/scripts/getListOfPeopleByIds";

class PersonService {
  getPersonByAddress = async (address: string) => {
    try {
      const data = await userScript({
        code: getPersonByAddressScript,
        args: [fcl.arg(address, fcl.t.Address)],
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getPerson = async () => {
    try {
      const userAcc = await fcl.currentUser().snapshot();
      if (!userAcc.addr) {
        throw new Error("User not logged in");
      }
      return await this.getPersonByAddress(userAcc.addr);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getArtist = async ([url, id]: [string, string]) => {
    try {
      return await this.getPersonByAddress(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  updatePersonImage = async ({ url }: { url: string }) => {
    try {
      await singleUserTransaction({
        code: updatePersonImgTransaction,
        args: [fcl.arg(url, fcl.t.String)],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  updateNFT = async ({
    newPrice,
    newUrl,
  }: {
    newPrice: number;
    newUrl: string;
  }) => {
    try {
      await singleUserTransaction({
        code: updatePersonNFTTransaction,
        args: [
          fcl.arg(parseInt(newPrice.toString()), fcl.t.Int),
          fcl.arg(newUrl, fcl.t.String),
        ],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  updatePersonLinkedSong = async ({ song }: { song: string }) => {
    try {
      await singleUserTransaction({
        code: updatePersonLikedSongTransaction,
        args: [fcl.arg(song, fcl.t.String)],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  buyNFT = async ({
    amount,
    artistID,
  }: {
    amount: number;
    artistID: string;
  }) => {
    try {
      await singleUserTransaction({
        code: buyNFTTransaction,
        args: [fcl.arg(amount, fcl.t.UInt64), fcl.arg(artistID, fcl.t.Address)],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getListOfPeopleByIds = async ([url, personIds]: [string, string[]]) => {
    try {
      console.log("personIds", personIds);
      if (!personIds.length) return [];
      const data = await userScript({
        code: getListOfPeopleByIdsScript,
        args: [fcl.arg(personIds, fcl.t.Array(fcl.t.Address))],
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

const personService = new PersonService();
export default personService;
