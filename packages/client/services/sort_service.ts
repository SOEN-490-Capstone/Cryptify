import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
 
function sort_date_newest(transactions: Transaction[]): Transaction[] {
   return transactions.sort((a,b) => Number(b.createdAt) - Number(a.createdAt));
}
 
function sort_date_oldest(transactions: Transaction[]){
    return transactions.sort((a,b) => Number(a.createdAt) - Number(b.createdAt));
   
}
 
function sort_amount_highest(transactions: Transaction[]) {
    return transactions.sort((a,b) => Number(b.amount) - Number(a.amount));
}
 
function sort_amount_lowest(transactions: Transaction[]) {
    return transactions.sort((a,b) => Number(a.amount) - Number(b.amount));
}
 
export default {
    sort_date_newest,
    sort_date_oldest,
    sort_amount_highest,
    sort_amount_lowest
};
