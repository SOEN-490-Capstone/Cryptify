const scanner = require('sonarqube-scanner');
scanner({
    serverUrl: "http://localhost:9000",
    token: "squ_352fcb00d78326b7379bd3f713e4c84997fa0929",
    options: {
        "sonar.sources": "./packages/api/src, ./packages/eth-edge/src, ./packages/btc-edge/src, ./packages/client",
        "sonar.tests": "./packages/api/test, ./packages/eth-edge/test, ./packages/btc-edge/test",
        "sonar.test.inclusions": "**/*.spec.ts",
        "sonar.typescript.lcov.reportPaths": "**/coverage/lcov.info",
        "sonar.exclusions": "**/android/**/*, **/ios/**/*, **/test/**/*, **/tests/**/*, **/icons/**/*",
        "sonar.testExecutionReportPaths": "./packages/api/test-report.xml, ./packages/eth-edge/test-report.xml, ./packages/eth-edge/test-report.xml"
    },
}, () => process.exit());
