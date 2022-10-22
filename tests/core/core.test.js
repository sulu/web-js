const core = require('../../packages/core/core.js');

const testFunctionComponent = (function(el) {
    this.el = el;
});

class TestClassComponent {
    constructor(el) {
        this.el = el;
    }
    getElement() {
        return this.el;
    }
}

const testObjectComponent = {
    initialize: function(el) {
        this.el = el;
    },
    getElement: function() {
        return this.el;
    },
};

module.exports = () => {
    it('test function component', function() {
        core.registerComponent('hello', testFunctionComponent);

        const component1 = core.startComponent('hello', 'object-1', {});
        const component2 = core.startComponent('hello', 'object-2', {});

        if (component1.el === component2.el) {
            throw new Error('Component 1 and Component 2 should be different in class component');
        }
    });

    it('test class component', function() {
        core.registerComponent('hello', TestClassComponent);

        const component1 = core.startComponent('hello', 'object-1', {});
        const component2 = core.startComponent('hello', 'object-2', {});

        if (component1.getElement() === component2.getElement()) {
            throw new Error('Component 1 and Component 2 should be different in class component');
        }
    });

    it('test object component', function() {
        core.registerComponent('hello', testObjectComponent);

        const component1 = core.startComponent('hello', 'object-1', {});
        const component2 = core.startComponent('hello', 'object-2', {});

        if (component1.getElement() === component2.getElement()) {
            throw new Error('Component 1 and Component 2 should be different in class component');
        }
    });
};
