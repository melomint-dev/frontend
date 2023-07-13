export const getUserNameByAddress = 
`
import MeloMint from 0xMeloMint

pub fun main(addr: Address): String? {
  let userId = MeloMint.getUserIdByAddress(addr: addr)! + 1 as UInt64
  return MeloMint.getUserById(userId: userId!)?.getName()
}
`