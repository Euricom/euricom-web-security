const { INLINE, NONE, SELF, REPORT_SAMPLE, NONCE } = require('express-csp-header');

module.exports = {
  directives: {
    'default-src': [SELF],
    'object-src': [NONE],
    'worker-src': [NONE],
    'base-uri': [SELF],
    'script-src': [SELF, REPORT_SAMPLE],
    'style-src': [SELF, REPORT_SAMPLE],
    'connect-src': [SELF],
    'img-src': [SELF],
    'font-src': [SELF],
    'frame-ancestors': SELF,
    'block-all-mixed-content': true,
  },
};
