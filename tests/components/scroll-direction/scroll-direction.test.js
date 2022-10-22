const core = require("../../../packages/core/core");
const scrollDirectionComponent = require("../../../packages/components/scroll-direction/scroll-direction");

module.exports = () => {
    it('test scroll-direction component', function() {
        core.registerComponent('scroll-direction', scrollDirectionComponent);

        const component1 = core.startComponent('scroll-direction', 'scroll-direction-1', {});
    });
};
