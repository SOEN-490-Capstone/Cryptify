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
            rate: 25, // number of constant iterations given `timeUnit`
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
            address: "0xd658d3d06eFCdAE88A8c65E111afF46E4608910c",
            name: "Test ETH",
            currencyType: "ETHEREUM",
        };
        http.post("http://localhost:3001/users/1/wallets", payload as any, { headers });
    })();

    // Get wallet
    (() => {
        const headers = { Authorization: `Bearer ${token}` };
        const res = http.get("http://localhost:3001/users/1/wallets", { headers });

        check(res, {
            "status is 200": () => res.status === 200,
        });
    })();
}
