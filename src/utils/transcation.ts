import * as fcl from "@onflow/fcl";

interface Transaction {
    code: string
    args: Array<any>
}

export const singleUserTransaction = async (transaction: Transaction) => {
    console.log(transaction);
    const transactionId = await fcl.send([
        fcl.transaction(transaction.code),
        fcl.args(transaction.args),
        fcl.proposer(fcl.currentUser),
        fcl.authorizations([fcl.currentUser]),
        fcl.payer(fcl.currentUser),
        fcl.limit(50)
    ]).then(fcl.decode);
    const transactionStatus = await fcl.tx(transactionId).onceSealed();
    console.log(transactionStatus);
    return transactionStatus;
}


