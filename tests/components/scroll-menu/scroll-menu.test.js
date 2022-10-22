const core = require("../../../packages/core/core");
const scrollMenuComponent = require("../../../packages/components/scroll-menu/scroll-menu");

module.exports = () => {
    it('test scroll-menu component', function() {
        core.registerComponent('scroll-menu', scrollMenuComponent);

        const component1 = core.startComponent('scroll-menu', 'scroll-menu-1', {});
    });
};
