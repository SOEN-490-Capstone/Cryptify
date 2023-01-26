import { Options } from 'k6/options';
import http from 'k6/http';
import {token} from "@cryptify/performance-tests/src/tests/fixtures/token_fixtures";
import {check} from "k6";

export const options: Options = {
    scenarios: {
        default: {
            executor: 'constant-arrival-rate',
            duration: '1s', // total duration
            preAllocatedVUs: 50, // to allocate runtime resources
            rate: 50, // number of constant iterations given `timeUnit`
            timeUnit: '1s',
        },
    },
};

export default function () {
    const headers = { 'Authorization': `Bearer ${token}` };
    const payload = {
        userId: 1,
        address: "0x09aDbe6849D72E7be8f9a93E3a26eD7D37709BEe",
        name: "test",
        currencyType: "ETHEREUM",
    };
    const res = http.post('http://localhost:3001/users/1/wallets', payload as any, { headers });

    check(res, {
        'status is 201': () => res.status === 201,
    });
}
