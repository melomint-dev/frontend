export const getCreator = 
`
import MeloMint from 0xMeloMint

pub fun main(addr: Address): MeloMint.Creator? {
  let userId = MeloMint.getCreatorIdByAddress(addr: addr)!
  return MeloMint.getCreatorById(creatorId: userId!)
}

`