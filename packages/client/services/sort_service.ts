import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
 
function sort_date_newest(transactions: Transaction[]){
   return transactions.sort((a,b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
}
 
function sort_date_oldest(transactions: Transaction[]){
    return transactions.sort((a,b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf());
}
 
function sort_amount_highest(transactions: Transaction[], walletAddress : string) {
    
    // Filters the array of transactions based on if theyre deposits or withdrawls
    // Performs the sort on the two shallow copy arrays and then concats the two arrays

    return (transactions.filter((transaction) => transaction.walletIn === walletAddress)
    .sort((a,b) => Number(b.amount) - Number(a.amount))
    .concat( 
    transactions.filter((transaction) => transaction.walletIn !== walletAddress)
    .sort((a,b) => Number(a.amount) - Number(b.amount))));
    }

 
function sort_amount_lowest(transactions: Transaction[], walletAddress : string) {
    // Functions the same as described above
    return (transactions.filter((transaction) => transaction.walletIn !== walletAddress)
    .sort((a,b) => Number(a.amount) - Number(b.amount))
    .concat( 
    transactions.filter((transaction) => transaction.walletIn === walletAddress)
    .sort((a,b) => Number(b.amount) - Number(a.amount))));
    }


// Applying the sort functions based on which sort option is selected
function sort_Transactions(sortType : string, transactions: Transaction[], walletAddress : string, setTransactions : React.Dispatch<React.SetStateAction<Transaction[]>> ) {

    if (sortType === "sortDateNewest"){
        setTransactions(sort_date_newest([...transactions]));    
    }
    if (sortType === "sortDateOldest"){
        setTransactions(sort_date_oldest([...transactions]));
    }
    if (sortType === "sortAmountHighest"){
        setTransactions(sort_amount_highest([...transactions], walletAddress));
    }
    if (sortType=== "sortAmountLowest"){
        setTransactions(sort_amount_lowest([...transactions], walletAddress)); 
    }
}

function sort_badge_Values(sortType : string){

    let returnString = sortType;

    if (sortType === "sortDateNewest"){
        returnString = "Date: newest first";
        return returnString;
    }
    if (sortType === "sortDateOldest"){
        returnString = "Date: oldest first";
        return returnString;
    }
    if (sortType === "sortAmountHighest"){
        returnString = "Amount: highest first";
        return returnString;
    }
    if (sortType === "sortAmountLowest"){
        returnString = "Amount: lowest first";
        return returnString;
    }
    return returnString;
}
 
export default {
    sort_date_newest,
    sort_date_oldest,
    sort_amount_highest,
    sort_amount_lowest,
    sort_Transactions,
    sort_badge_Values
};
