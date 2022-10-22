const core = require("../../../packages/core/core");
const toggleComponent = require("../../../packages/components/toggle/toggle");

module.exports = () => {
    it('test toggle component', function() {
        core.registerComponent('toggle', toggleComponent);

        const component1 = core.startComponent('toggle', 'toggle-1', {});
    });
};
