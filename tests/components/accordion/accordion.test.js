const core = require("../../../packages/core/core");
const accordionComponent = require("../../../packages/components/accordion/accordion");

module.exports = () => {
    it('test accordion component', function() {
        core.registerComponent('accordion', accordionComponent);

        try {
            const component1 = core.startComponent('accordion', 'accordion-1', {});
        } catch (e) {
            // ignore non existing DOM error
        }
    });
};
