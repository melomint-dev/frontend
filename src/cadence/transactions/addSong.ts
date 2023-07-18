export const addSongTransaction = `import MeloMint from 0xMeloMint

transaction(id: String, name: String, freeUrl: String, img: String, duration: UInt64, preRelease: UFix64) {
  prepare(signer: AuthAccount) {
    MeloMint.newSong(id: id, name: name, artist: signer, img: img, freeUrl: freeUrl, duration: UFix64(duration), preRelease: preRelease)
  }
}
`;
