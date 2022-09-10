const createExpoWebpackConfigAsync = require("@expo/webpack-config"); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(
        {
            ...env,
            babel: {
                dangerouslyAddModulePathsToTranspile: ["@cryptify"],
            },
        },
        argv,
    );
    return config;
};
