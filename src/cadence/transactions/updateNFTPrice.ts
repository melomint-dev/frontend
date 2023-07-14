export const updateNFTPrice = `
import MeloMint from 0xMeloMint

transaction(price: UInt) {
  prepare(signer: AuthAccount) {
    let creatorId = MeloMint.getCreatorIdByAddress(addr: signer.address)!
    let creator = MeloMint.getCreatorById(creatorId: creatorId)
    MeloMint.updatePrice(creator: creator!, newPrice: price)
  }
}
`