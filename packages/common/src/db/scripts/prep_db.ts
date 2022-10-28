import { clearDB } from "@cryptify/common/src/db/clear_db";
import { seedDB } from "@cryptify/common/src/db/seed_db";

(async () => {
    await clearDB();
    await seedDB();
})();
