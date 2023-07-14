export const getUser = 
`
import MeloMint from 0xMeloMint

pub fun main(addr: Address): MeloMint.User? {
  let userId = MeloMint.getUserIdByAddress(addr: addr)
  return MeloMint.getUserById(userId: userId!)
}
`