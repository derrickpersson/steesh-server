const Mixpanel = require('mixpanel');
const analytics = Mixpanel.init(process.env.ANALYTICS_TOKEN);

module.exports = {
    Mixpanel,
    analytics,
}
