import useSWR from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import authService from "@/services/auth.service";

export async function authenticationFetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      authType: string;
      data: any;
    };
  }
) {
  console.log("arg", arg);
  try {
    return await authService[arg.authType as keyof typeof authService](
      arg.data
    );
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
