const scanner = require('sonarqube-scanner');
scanner({
    serverUrl: "http://localhost:9000",
    token: "squ_ffabf6845e674b618fa6ac41e8901b65d7ad48ca",
    options: {
        "sonar.sources": "./packages/api/src, ./packages/eth-edge/src, ./packages/btc-edge/src, ./packages/client, ./packages/common/src",
        "sonar.tests": "./packages/api/test, ./packages/eth-edge/test, ./packages/btc-edge/test, ./packages/common/test",
        "sonar.test.inclusions": "**/*.spec.ts",
        "sonar.typescript.lcov.reportPaths": "**/coverage/lcov.info",
        "sonar.exclusions": "**/android/**/*, **/ios/**/*, **/test/**/*, **/tests/**/*, **/icons/**/*, **/wav.ts, **/wav-in.js",
        "sonar.testExecutionReportPaths": "./packages/api/test-report.xml, ./packages/eth-edge/test-report.xml, ./packages/btc-edge/test-report.xml"
    },
}, () => process.exit());
