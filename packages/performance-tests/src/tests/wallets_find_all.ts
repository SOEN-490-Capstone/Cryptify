import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import {token} from "@cryptify/performance-tests/src/tests/fixtures/token_fixtures";

export const options: Options = {
    scenarios: {
        default: {
            executor: 'constant-arrival-rate',
            duration: '1s', // total duration
            preAllocatedVUs: 20, // to allocate runtime resources
            rate: 20, // number of constant iterations given `timeUnit`
            timeUnit: '1s',
        },
    },
};

export default function () {
    const headers = { 'Authorization': `Bearer ${token}` };
    const res = http.get('http://localhost:3001/users/1/wallets', { headers });

    check(res, {
        'status is 200': () => res.status === 200,
    });
}
