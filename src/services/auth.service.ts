import * as fcl from "@onflow/fcl";
import { addPersonTransaction } from "@/cadence/transactions";
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
      await singleUserTransaction({
        code: addPersonTransaction,
        args: [
          fcl.arg(firstName, fcl.t.String),
          fcl.arg(lastName, fcl.t.String),
          fcl.arg(userType === "artist" ? 1 : 0, fcl.t.Int),
        ],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

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
}

const authService = new AuthService();
export default authService;
