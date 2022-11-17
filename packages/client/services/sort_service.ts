import { Transaction } from "@cryptify/common/src/domain/entities/transaction";
 
function sort_date_newest(transactions: Transaction[]){
   return transactions.sort((a,b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
}
 
function sort_date_oldest(transactions: Transaction[]){
    return transactions.sort((a,b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf());
   
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
