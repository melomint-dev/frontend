export const addSongTransaction = `import MeloMint from 0xMeloMint

transaction(id: String, name: String, freeUrl: String, img: String) {
  prepare(signer: AuthAccount) {
    MeloMint.newSong(id: id, name: name, artist: signer.address, img: img, freeUrl: freeUrl)
  }

  execute {
    log(MeloMint.getSongs())
  }
}
`;
