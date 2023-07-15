import * as fcl from "@onflow/fcl";
import {
  addUserTransaction,
  addCreatorTransaction,
} from "@/cadence/transactions";
import { singleUserTransaction } from "@/utils/transcation";
import { parse } from "path";

class AuthService {
  register = async ({
    firstName,
    lastName,
    userType,
  }: {
    firstName: string;
    lastName: string;
    userType: string;
  }) => {
    console.log("PARAMS", firstName, lastName, userType);
    try {
      if (userType == "artist") {
        await singleUserTransaction({
          code: addCreatorTransaction,
          args: [
            fcl.arg(firstName, fcl.t.String),
            fcl.arg(lastName, fcl.t.String),
            fcl.arg(userType, fcl.t.String),
          ],
        });
      } else {
        await singleUserTransaction({
          code: addUserTransaction,
          args: [
            fcl.arg(firstName, fcl.t.String),
            fcl.arg(lastName, fcl.t.String),
            fcl.arg(userType, fcl.t.String),
          ],
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // createCreator = async ({
  //   firstName,
  //   email,
  //   userType,
  // }: {
  //   firstName: string;
  //   email: string;
  //   userType: string;
  // }) => {
  //   try {
  //     await singleUserTransaction({
  //       code: addCreatorTransaction,
  //       args: [
  //         fcl.arg(firstName, fcl.t.String),
  //         fcl.arg(email, fcl.t.String),
  //         fcl.arg(userType, fcl.t.String),
  //       ],
  //     });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  login = async () => {
    try {
      const user = await fcl.logIn();
      console.log(user.addr);
      if (!user.addr) {
        console.log("Connecting to Wallet failed");
        throw new Error("Connecting to Wallet failed");
      }
      const userAddress = await fcl.currentUser().snapshot();
      console.log(userAddress);
      return true;
    } catch (error) {
      console.log(error);
      throw error;
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

  // getUserAddress = async () => {
  //   try {
  //     const userAddress = await fcl.currentUser().snapshot();
  //     return userAddress.addr;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // createUser = async ({
  //   firstName,
  //   email,
  //   userType,
  // }: {
  //   firstName: string;
  //   email: string;
  //   userType: string;
  // }) => {
  //   try {
  //     await singleUserTransaction({
  //       code: addUserTransaction,
  //       args: [
  //         fcl.arg(firstName, fcl.t.String),
  //         fcl.arg(email, fcl.t.String),
  //         fcl.arg(userType, fcl.t.String),
  //       ],
  //     });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // createCreator = async ({
  //   firstName,
  //   email,
  //   userType,
  // }: {
  //   firstName: string;
  //   email: string;
  //   userType: string;
  // }) => {
  //   try {
  //     await singleUserTransaction({
  //       code: addCreatorTransaction,
  //       args: [
  //         fcl.arg(firstName, fcl.t.String),
  //         fcl.arg(email, fcl.t.String),
  //         fcl.arg(userType, fcl.t.String),
  //       ],
  //     });
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // connetWallet = async () => {
  //   try {
  //     const user = await fcl.logIn();
  //     console.log(user.addr);
  //     const userAddress = await fcl.currentUser().snapshot();
  //     console.log(userAddress);
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // disconnectWallet = async () => {
  //   try {
  //     const logout = await fcl.unauthenticate();
  //     console.log(logout);
  //     return true;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };

  // getUserAddress = async () => {
  //   try {
  //     const userAddress = await fcl.currentUser().snapshot();
  //     return userAddress.addr;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };
}

const authService = new AuthService();
export default authService;
