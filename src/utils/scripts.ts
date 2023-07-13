import * as fcl from "@onflow/fcl";

interface Script {
  code: string;
  args: Array<any>;
}

export const userScript = async (script: Script) => {
  // console.log(script);
  const response = await fcl.send([
    fcl.script(script.code),
    fcl.args(script.args),
  ]);
  const data = await fcl.decode(response);
  console.log(data);
  return data;
};
