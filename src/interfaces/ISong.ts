import { IUser } from "./IUser";

export interface ISong {
  id: string;
  name: string;
  artist: IUser;
  freeUrl: string;
  img: string;
  duration: number;
  uploadedAt: string;
  similarSongs: {
    [key: string]: string;
  };
  similarTo: {
    [key: string]: string[];
  };
  likes: string;
  plays: {
    [key: string]: number;
  };
  playTime: {
    [key: string]: number;
  };
}
