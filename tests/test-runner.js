// custom simple test runner

global.window = {};
global.testRunnerErrorCounter = 0;
global.testRunnerTestCounter = 0;
global.testRunnerWarnCounter = 0;
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

global.document = {};
global.document.getElementById = function(id) {
    if ('object-1' === id) {
        return {
            el: '1',
        };
    } else if ('object-2' === id) {
        return {
            el: '2',
        };
    } else if ('accordion-1' === id) {
        return {
            children: [{querySelector: () => {}}],
        };
    }
};

const expectedWarnings = 8;
global.console.warn = () => {
    ++global.testRunnerWarnCounter;
};

(require('./core/core.test.js'))();
(require('./core/core.legacy.test.js'))();
(require('./components/accordion/accordion.test.js'))();
(require('./components/container-link/container-link.test.js'))();
(require('./components/expand/expand.test.js'))();
(require('./components/scroll-direction/scroll-direction.test.js'))();
(require('./components/scroll-menu/scroll-menu.test.js'))();
(require('./components/tabs/tabs.test.js'))();
(require('./components/toggle/toggle.test.js'))();
(require('./components/truncate/truncate.test.js'))();
(require('./components/window-scroll/window-scroll.test.js'))();

console.log(' ');

if (global.testRunnerErrorCounter !== 0) {
    console.error(global.testRunnerErrorCounter  + ' from ' + global.testRunnerTestCounter +  ' tests failed!');
    process.exit(1);
}

if (global.testRunnerWarnCounter !== expectedWarnings) {
    console.error(global.testRunnerWarnCounter  + ' warnings thrown ' + expectedWarnings + ' were expected!');
    process.exit(1);
}

console.log(+ global.testRunnerTestCounter +  ' tests successfully!');
