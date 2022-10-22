const core = require("../../../packages/core/core");
const accordionComponent = require("../../../packages/components/accordion/accordion");

module.exports = () => {
    it('test accordion component', function() {
        core.registerComponent('accordion', accordionComponent);

        const component1 = core.startComponent('accordion', 'accordion-1', {});
    });
};
