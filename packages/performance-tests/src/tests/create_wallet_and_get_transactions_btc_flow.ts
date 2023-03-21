import { check } from "k6";
import { Options } from "k6/options";
import http from "k6/http";
import { token } from "@cryptify/performance-tests/src/tests/fixtures/token_fixtures";

export const options: Options = {
    scenarios: {
        default: {
            executor: "constant-arrival-rate",
            duration: "5s", // total duration
            preAllocatedVUs: 50, // to allocate runtime resources
            rate: 50, // number of constant iterations given `timeUnit`
            timeUnit: "1s",
        },
    },
};

export default function () {
    // Sign in
    (() => {
        const payload = {
            email: "john@example.com",
            password: "Test123!",
        };
        const res = http.post("http://localhost:3001/auth/signin", payload as any);

        check(res, {
            "status is 201": () => res.status === 201,
        });
    })();

    // Get user from whoami
    (() => {
        const headers = { Authorization: `Bearer ${token}` };
        const res = http.get("http://localhost:3001/users/whoami", { headers });

        check(res, {
            "status is 200": () => res.status === 200,
        });
    })();

    // Create wallet
    (() => {
        const headers = { Authorization: `Bearer ${token}` };
        const payload = {
            userId: 1,
            address: "bc1qt2sps5xjpu4r5tten65c8nue8zqg8a235wmakq",
            name: "test",
            currencyType: "BITCOIN",
        };
        http.post("http://localhost:3001/users/1/wallets", payload as any, { headers });
    })();

    // Get transactions
    (() => {
        const headers = { Authorization: `Bearer ${token}` };
        const res = http.get("http://localhost:3001/users/1/transactions", { headers });

        check(res, {
            "status is 200": () => res.status === 200,
        });
    })();
}
