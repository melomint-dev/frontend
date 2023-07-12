export const addCreatorTransaction = `import MeloMint from 0xMeloMint

transaction(name: String, email: String, type: String) {
  prepare(signer: AuthAccount) {
    MeloMint.CreateCreator(name: name, email: email, type: type, creatorAdress: signer.address)
    log(MeloMint.getCreatorIdByAddress(addr: signer.address))
  }

  execute {
    log(MeloMint.getCreators())
  }
}`;
