// custom simple test runner

global.window = {};
global.testRunnerErrorCounter = 0;
global.testRunnerTestCounter = 0;
global.it = (name, testFunction) => {
    ++global.testRunnerTestCounter;

    let success = true;

    try {
        testFunction();
    } catch (e) {
        ++global.testRunnerTestCounter;
        console.error(e);
        success = false;
    }

    console.log((success ? 'OK  ' : 'FAIL ') + name);
};

const object1 = {
    el: '1',
};
const object2 = {
    el: '2',
};

global.document = {};
global.document.getElementById = function(id) {
    if ('object-1' === id) {
        return object1;
    } else if ('object-2' === id) {
        return object2;
    }
};

global.console.warn = () => {};

const coreTest = require('./core/core.test.js');
const coreLegacyTest = require('./core/core.legacy.test.js');

coreTest();
coreLegacyTest();

console.log(' ');

if (global.testRunnerErrorCounter !== 0) {
    console.error(global.testRunnerErrorCounter  + ' from ' + global.testRunnerTestCounter +  ' tests failed!');
    process.exit(1);
}

console.log(+ global.testRunnerTestCounter +  ' tests successfully!');
