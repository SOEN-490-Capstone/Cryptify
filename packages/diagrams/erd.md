```mermaid
erDiagram
    USERS ||--o{ WALLETS : has
    USERS {
        int user_id
        string name
        string email
        string password
        bool is_pro
    }
    WALLETS }0--0{ TRANSACTIONS : contains
    WALLETS {
        string wallet_hash
        double amount
        string type
    }
    TRANSACTIONS {
        string transaction_hash
        string wallet_in_hash
        string wallet_out_hash
        double amount
    }
```
