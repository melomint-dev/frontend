import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { addUserTransaction } from "@/cadence/transactions/addUser";
import { singleUserTransaction } from "@/utils/transcation";

fcl.config({
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

class TransactionService {
  createUser = async ({firstName, lastName, userType} : {
    firstName: string,
    lastName: string,
    userType: string
  }) => {
    try {
      singleUserTransaction({
        code: addUserTransaction,
        args: [
          fcl.arg(firstName, t.String),
          fcl.arg(lastName, t.String),
          fcl.arg(userType, t.String),
        ],
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  

}

export default new TransactionService();
