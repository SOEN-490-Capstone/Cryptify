const scanner = require('sonarqube-scanner');
scanner({
    serverUrl: "http://localhost:9000",
    token: "squ_16e26ed893e740b9e70480cf1bcc53d8c4d159fb",
    options: {
        "sonar.sources": "./packages/api/src, ./packages/eth-edge/src, ./packages/btc-edge/src, ./packages/client, ./packages/common/src",
        "sonar.tests": "./packages/api/test, ./packages/eth-edge/test, ./packages/btc-edge/test, ./packages/common/test",
        "sonar.test.inclusions": "**/*.spec.ts",
        "sonar.typescript.lcov.reportPaths": "**/coverage/lcov.info",
        "sonar.exclusions": "**/android/**/*, **/ios/**/*, **/test/**/*, **/tests/**/*, **/icons/**/*, **/wav.ts, **/wav-in.js, **/node-modules/**/*",
        "sonar.testExecutionReportPaths": "./packages/api/test-report.xml, ./packages/eth-edge/test-report.xml, ./packages/btc-edge/test-report.xml",
        "sonar.issue.ignore.multicriteria": "e1,e2,e3",
        "sonar.issue.ignore.multicriteria.e1.ruleKey": "typescript:S6478",
        "sonar.issue.ignore.multicriteria.e1.resourceKey": "**/*.tsx",
        "sonar.issue.ignore.multicriteria.e2.ruleKey": "typescript:S1135",
        "sonar.issue.ignore.multicriteria.e2.resourceKey": "**/*.tsx",
        "sonar.issue.ignore.multicriteria.e3.ruleKey": "typescript:S1135",
        "sonar.issue.ignore.multicriteria.e3.resourceKey": "**/*.ts",
    },
}, () => process.exit());
