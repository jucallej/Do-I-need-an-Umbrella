module.exports = {
    verbose: true,
    setupFiles: ['./jest-helpers/setupJest.ts'],
    moduleNameMapper: {
        "\\.css$": "identity-obj-proxy"
    },
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "jest-svg-transformer"
    },
    testPathIgnorePatterns: ['/node_modules/', '/ui-tests/']
};
