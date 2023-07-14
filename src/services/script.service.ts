import * as fcl from "@onflow/fcl";

import { userScript } from "@/utils/scripts";

import { getUserNameByAddress, getCreator } from "@/cadence/scripts";

fcl.config({
  "accessNode.api": "https://access-testnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

class scriptService {
  _getUserNameByAddress = async ({ address }: { address: string }) => {
    try {
      console.log(address);
      const response = await userScript({
        code: getUserNameByAddress,
        args: [fcl.arg(address, fcl.t.Address)],
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  _getCreator = async ({ address }: { address: string }) => {
    try {
      console.log(address);
      const response = await userScript({
        code: getCreator,
        args: [fcl.arg(address, fcl.t.Address)],
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

}

export default new scriptService();
