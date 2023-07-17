import * as fcl from "@onflow/fcl";
import { singleUserTransaction } from "@/utils/transcation";
import { userScript } from "@/utils/scripts";

import { getCreatoryByAddressScript } from "@/cadence/scripts";
import { updatePersonNFTPriceTransaction, updatePersonImgTransaction } from "@/cadence/transactions";

class PersonService {
  getPersonByAddress = async (address: string) => {
    try {
      const data = await userScript({
        code: getCreatoryByAddressScript,
        args: [fcl.arg(address, fcl.t.Address)],
      });
      console.log("udata", data);
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


  updateNFTPrice = async ({ price }: { price: number }) => {
    try {
      await singleUserTransaction({
        code: updatePersonNFTPriceTransaction,
        args: [fcl.arg(parseInt(price.toString()), fcl.t.Int)],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

const personService = new PersonService();
export default personService;
