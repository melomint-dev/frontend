export const addPerson = `
import MeloMint from 0xMeloMint

// type -> 0 User
// type -> 1 Artist
transaction (firstName: String, lastName: String, type: Int) {
  prepare(signer: AuthAccount) {
    MeloMint.newPerson(id: signer.address, firstName: firstName, lastName: lastName, type: type)
  }
}
`