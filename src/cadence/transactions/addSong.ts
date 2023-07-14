export const addSongTransaction = `
import MeloMint from 0xMeloMint

transaction(name: String, img: String, url: String) {
  prepare(signer: AuthAccount) {
    let creatorId = MeloMint.getCreatorIdByAddress(addr: signer.address)
    MeloMint.createSong(name: name, creator: signer.address, img: img, url: url, creatorId: creatorId!)
  }

  execute {
    log(MeloMint.getSongs())
    log(MeloMint.getCreators())
  }
}

`