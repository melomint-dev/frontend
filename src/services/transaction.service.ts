import * as fcl from "@onflow/fcl";

import {
  addSongTransaction,
  // updateNFTPriceTransaction,
  buyNFTTransaction,
} from "@/cadence/transactions";
import { singleUserTransaction } from "@/utils/transcation";
import { parse } from "path";

class TransactionService {
  connetWallet = async () => {
    try {
      const user = await fcl.logIn();
      console.log(user.addr);
      const userAddress = await fcl.currentUser().snapshot();
      console.log(userAddress);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  disconnectWallet = async () => {
    try {
      const logout = await fcl.unauthenticate();
      console.log(logout);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getUserName = async ({ address }: { address: string }) => {
    try {
      return "Raj Varsani";
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  getUserAddress = async () => {
    try {
      const userAddress = await fcl.currentUser().snapshot();
      return userAddress.addr;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  uploadSong = async ({
    songName,
    songCoverUrl,
    songUrl,
  }: {
    songName: string;
    songCoverUrl: string;
    songUrl: string;
  }) => {
    try {
      await singleUserTransaction({
        code: addSongTransaction,
        args: [
          fcl.arg(songName, fcl.t.String),
          fcl.arg(songCoverUrl, fcl.t.String),
          fcl.arg(songUrl, fcl.t.String),
        ],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // updateNFTPrice = async ({ price }: { price: number }) => {
  //   try {
  //     await singleUserTransaction({
  //       code: updateNFTPriceTransaction,
  //       args: [fcl.arg(price.toString(), fcl.t.UInt)],
  //     });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  buyNFT = async ({ price }: { price: number }) => {
    try {
      await singleUserTransaction({
        code: buyNFTTransaction,
        args: [fcl.arg(price, fcl.t.UInt64)],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
}

export default new TransactionService();
