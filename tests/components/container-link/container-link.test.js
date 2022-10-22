const core = require("../../../packages/core/core");
const containerLinkComponent = require("../../../packages/components/container-link/container-link");

module.exports = () => {
    it('test container-link component', function() {
        core.registerComponent('container-link', containerLinkComponent);

        const component1 = core.startComponent('container-link', 'container-link-1', {});
    });
};
