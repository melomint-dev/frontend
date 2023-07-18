export const removePersonLikedSongTransaction = `
import MeloMint from 0xMeloMint

transaction (songId: String) {
    prepare(signer: AuthAccount) {
        MeloMint.personRemoveLikedSongs(person: signer, songId: songId)
    }
}`;
