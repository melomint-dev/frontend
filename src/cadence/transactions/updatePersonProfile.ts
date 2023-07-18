export const updatePersonProfileTransaction = `import MeloMint from 0xMeloMint

transaction(newPrice: Int, newImageUrl: String) {
    prepare(signer: AuthAccount) {
        MeloMint.changeNFTPriceAndImage(person: signer, price: newPrice, newNFTImage: newImageUrl)
    }
}`;
