class APIConstants {    
    static IPFS_BASE_URL = "https://gateway.pinata.cloud/ipfs/";
  static BASE_URL =
    "https://melomint-infra.centralindia.cloudapp.azure.com/api/";
  static UPLOAD_IMAGE = this.BASE_URL + "uploadImage";
}

const API_CONSTANTS = {
  ...APIConstants,

};

export default API_CONSTANTS;
