const scanner = require('sonarqube-scanner');
scanner({
    serverUrl: "http://localhost:9000",
    token: "squ_574c61649698b70c012e8e5ddb2b2883e8663f5e",
    options: {
        "sonar.sources": "./packages/api, ./packages/eth-edge, ./packages/client",
        "sonar.exclusions": "**/android/**/*, **/ios/**/*, **/test/**/*, **/tests/**/*",
    },
}, () => process.exit());
