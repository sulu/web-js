const core = require("../../../packages/core/core");
const tabsComponent = require("../../../packages/components/tabs/tabs");

module.exports = () => {
    it('test tabs component', function() {
        core.registerComponent('tabs', tabsComponent);

        const component1 = core.startComponent('tabs', 'tabs-1', {});
    });
};
