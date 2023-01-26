import { Options } from "k6/options";
import http from "k6/http";
import { token } from "@cryptify/performance-tests/src/tests/fixtures/token_fixtures";
import { check } from "k6";

export const options: Options = {
    scenarios: {
        default: {
            executor: "constant-arrival-rate",
            duration: "1s", // total duration
            preAllocatedVUs: 50, // to allocate runtime resources
            rate: 50, // number of constant iterations given `timeUnit`
            timeUnit: "1s",
        },
    },
};

export default function () {
    const headers = { Authorization: `Bearer ${token}` };
    const payload = {
        userId: 1,
        walletAddress: "0xb64a30399f7f6b0c154c2e7af0a3ec7b0a5b131a",
        currencyType: "ETHEREUM",
        transactionsIn: true,
        transactionsOut: true,
        startDate: 0,
        endDate: +new Date(),
        fileType: "CSV",
    };
    const res = http.post("http://localhost:3001/users/1/reports/transaction-history", payload as any, { headers });

    check(res, {
        "status is 201": () => res.status === 201,
    });
}
