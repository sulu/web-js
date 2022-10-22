const core = require("../../../packages/core/core");
const expandComponent = require("../../../packages/components/expand/expand");

module.exports = () => {
    it('test expand component', function() {
        core.registerComponent('expand', expandComponent);

        const component1 = core.startComponent('expand', 'expand-1', {});
    });
};
