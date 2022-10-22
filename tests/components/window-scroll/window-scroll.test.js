const core = require("../../../packages/core/core");
const windowScrollComponent = require("../../../packages/components/window-scroll/window-scroll");

module.exports = () => {
    it('test window-scroll component', function() {
        core.registerComponent('window-scroll', windowScrollComponent);

        const component1 = core.startComponent('window-scroll', 'window-scroll-1', {});
    });
};
