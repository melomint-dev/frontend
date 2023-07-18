class APIConstants {
  static IPFS_BASE_URL = "https://gateway.pinata.cloud/ipfs/";
  static BASE_URL =
    "https://melomint-infra.centralindia.cloudapp.azure.com/api/";
  // static BASE_URL = "http://localhost:8000/";

  static FLOW_URL = this.BASE_URL + "flow";
  static FLOW_ABSTRACTIONS_URL = this.FLOW_URL + "/abstractions";

  static UPLOAD_IMAGE = this.BASE_URL + "uploadImage";
  static UPLOAD_AUDIO = this.BASE_URL + "uploadAudio";
  static BUY_NFT = this.FLOW_URL + "/addSubscribers";
  static BUY_SUBSCRIPTION = this.FLOW_URL + "/updateSubscriptionTime";
  static ADD_SONG = this.BASE_URL + "/upload";
  static GET_FILE = this.BASE_URL + "get-file";

  static GET_TRENDING_SONGS = this.FLOW_ABSTRACTIONS_URL + "/songs/trending";
  static GET_LATEST_SONGS = this.FLOW_ABSTRACTIONS_URL + "/songs/latest";
  static GET_ARTISTS_ON_RISE = this.FLOW_ABSTRACTIONS_URL + "/artists/rising";
  static SEARCH_QUERY = this.FLOW_ABSTRACTIONS_URL + "/search";
}

const API_CONSTANTS = {
  ...APIConstants,
};

export default API_CONSTANTS;
