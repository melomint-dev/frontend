export const getPerson = `import MeloMint from 0xMeloMint

pub fun main(address: Address): MeloMint.Person? {
  return MeloMint.getPersonByAddress(id: address)
}
`;
