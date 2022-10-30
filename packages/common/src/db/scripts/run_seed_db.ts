import "dotenv/config";
import { seedDB } from "@cryptify/common/src/db/seed_db";

(async () => {
    console.log("Starting seeding db...");
    await seedDB();
    console.log("Finished seeding db...");
})();
