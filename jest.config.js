module.exports = {
    preset: 'jest-preset-angular ',
    setupFilesAfterEnv: ['./src/setup-jest.ts'],
    globalSetup : 'jest-preset-angular/global-setup',
    testMatch: ['/+(*.)+(spec).+(ts)'],
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    collectCoverage : true ,
    coverageReporters : [ "html" , "text - summary"],
    coverageDirectory : "coverage/angular-sample-small-project",
    testEnvironment : "jsdom",
    globals : {
        "ts-jest" : {
            tsconfig : "<rootDir>/tsconfig.spec.json",
        }
    }
}