import useSWR, { mutate } from "swr";
import SWR_CONSTANTS from "@/utils/swrConstants";
import songService from "@/services/song.service";
import { ISong } from "@/interfaces/ISong";
import API_CONSTANTS from "@/utils/apiConstants";
import { NumericLiteral } from "typescript";

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

export function useSongList(list: string[]) {
  const { data, error, isLoading } = useSWR(
    [SWR_CONSTANTS.GET_USER, list],
    songService.getListOfSongDetailsViaSongIds
  );

  return {
    songListData: data as ISong[],
    isSongListDataLoading: isLoading as boolean,
    errorFetchingSongListData: error,
  };
}

export async function addSongFetcher(
  url: string,
  {
    arg,
  }: {
    arg: {
      name: string;
      song: File;
      img: File;
      preRelease: number;
    };
  }
) {
  try {
    const duration = await new Promise<number>((resolve, reject) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(arg.song);

      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        resolve(duration);
      });

      audio.addEventListener("error", (error) => {
        reject(error);
      });
    });

    console.log("duration", duration);

    const formData = new FormData();
    formData.append("audio", arg.song as File);
    formData.append("image", arg.img as File);

    const res = await fetch(API_CONSTANTS.ADD_SONG, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("data", data);

    await songService.addSong({
      id: data.coverImageHash,
      name: arg.name,
      freeUrl: data.LowQualityIpfsHash,
      img: data.coverImageHash,
      duration: parseInt(duration.toString()),
      preRelease: parseInt((arg.preRelease / 1000).toString()),
    });
    await mutate(SWR_CONSTANTS.GET_USER);
  } catch (err) {
    console.log("err", err);
    throw err;
  }
}
