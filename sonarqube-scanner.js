const scanner = require('sonarqube-scanner');
scanner({
    serverUrl: "http://localhost:9000",
    token: "squ_574c61649698b70c012e8e5ddb2b2883e8663f5e",
    options: {
        "sonar.sources": "./packages/api/src, ./packages/eth-edge/src",
        "sonar.tests": "./packages/api/test, ./packages/eth-edge/test",
        "sonar.test.inclusions": "**/*.spec.ts",
        "sonar.typescript.lcov.reportPaths": "**/coverage/lcov.info",
        "sonar.exclusions": "**/android/**/*, **/ios/**/*, **/test/**/*, **/tests/**/*",
        "sonar.testExecutionReportPaths": ".packages/api/test-report.xml"
    },
}, () => process.exit());
