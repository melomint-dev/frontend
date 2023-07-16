export const isPersonExists = `import MeloMint from 0xMeloMint

pub fun main(address: Address): Bool {
  return MeloMint.isPersonExists(id: address)
}
`;
