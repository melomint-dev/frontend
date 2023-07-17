import useSWR from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import songService from "@/services/song.service";
import API_CONSTANTS from "@/utils/apiConstants";

interface ISong {
  id: string;
  name: string;
  artist: string;
  freeUrl: string;
  img: string;
  bannerImg: string;
  uploadedAt: string; // time

  similarSongs: { string: [string] }; // original
  similarTo: { string: [string] }; // copied

  likes: number;
  plays: { string: number };
  playTime: { string: number };
}

export function useSong(id: string) {
  const { data, error, isLoading } = useSWR(
    [SWR_CONSTANTS.GET_USER, id],
    songService.getSong
  );

  return {
    songData: data as ISong,
    isSongDataLoading: isLoading as boolean,
    errorFetchingSongData: error,
  };
}

export async function addSongFetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      // id: string;
      name: string;
      // freeUrl: string;
      img: File;
    };
  }
) {
  try {

    // const formData = new FormData();
    // formData.append("image", arg.img as File);

    // const res = await fetch(API_CONSTANTS.UPLOAD_IMAGE, {
    //   method: "POST",
    //   body: formData,
    // });

    // const data = await res.json();
    // console.log("data", data);


    // return await songService.addSong({
    //   id: arg.id,
    //   name: arg.name,
    //   freeUrl: arg.freeUrl,
    //   img: arg.img,
    // });
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
