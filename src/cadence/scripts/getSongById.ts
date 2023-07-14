export const getSongById = 
`
import MeloMint from 0xMeloMint

pub fun main(songId: UInt64): MeloMint.Song? {
  return MeloMint.getSongById(songId: songId)
}
`