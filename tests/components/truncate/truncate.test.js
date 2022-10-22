const core = require("../../../packages/core/core");
const truncateComponent = require("../../../packages/components/truncate/truncate");

module.exports = () => {
    it('test truncate component', function() {
        core.registerComponent('truncate', truncateComponent);

        const component1 = core.startComponent('truncate', 'truncate-1', {});
    });
};
