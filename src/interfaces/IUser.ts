export interface IUser {
  NFTimage: string;
  NFTprice: number;
  firstName: string;
  id: string;
  img: string;
  lastName: string;
  likedSongs: {
    [key: string]: boolean;
  };
  recentlyHeard: string[];
  revenue: string;
  songsPublished: {
    [key: string]: boolean;
  };
  subscribedTo: {
    [key: string]: boolean;
  };
  subscribers: {
    [key: string]: boolean;
  };
  subscriptionTill: string;
  type: string;
}
