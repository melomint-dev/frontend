import * as fcl from "@onflow/fcl";
import { singleUserTransaction } from "@/utils/transcation";
import { userScript } from "@/utils/scripts";

import { getSongByIdScript } from "@/cadence/scripts";
import { addSongTransaction } from "@/cadence/transactions";
import { getListOfSongDetailsViaSongIdsScript } from "@/cadence/scripts/getListOfSongDetailsViaSongIds";

class SongService {
  getSong = async ([url, id]: [string, string]) => {
    try {
      const data = await singleUserTransaction({
        code: getSongByIdScript,
        args: [fcl.arg(id, fcl.t.String)],
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  addSong = async (song: {
    id: string;
    name: string;
    freeUrl: string;
    img: string;
    duration: number;
  }) => {
    try {
      const data = await singleUserTransaction({
        code: addSongTransaction,
        args: [
          fcl.arg(song.id, fcl.t.String),
          fcl.arg(song.name, fcl.t.String),
          fcl.arg(song.freeUrl, fcl.t.String),
          fcl.arg(song.img, fcl.t.String),
          fcl.arg(song.duration, fcl.t.UInt64),
        ],
      });
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  getListOfSongDetailsViaSongIds = async ([url, songIds]: [
    string,
    string[]
  ]) => {
    try {
      if (!songIds.length) return [];
      const data = await userScript({
        code: getListOfSongDetailsViaSongIdsScript,
        args: [fcl.arg(songIds, fcl.t.Array(fcl.t.String))],
      });
      return data.map((song: any) => ({
        ...song.song,
        artist: song.artist,
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
}

const songService = new SongService();
export default songService;
