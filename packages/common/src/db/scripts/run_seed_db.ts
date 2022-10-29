import { seedDB } from "@cryptify/common/src/db/seed_db";

(async () => {
    await seedDB();
    console.log("Finished seeding db...");
})();
