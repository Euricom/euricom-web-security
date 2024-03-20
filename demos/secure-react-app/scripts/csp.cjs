const { INLINE, NONE, SELF, REPORT_SAMPLE, NONCE, STRICT_DYNAMIC, HTTPS } = require("express-csp-header");

module.exports = {
  directives: {
    "default-src": [SELF],
    "object-src": [NONE],
    "worker-src": [NONE],
    "base-uri": [SELF],
    "script-src": [SELF, NONCE, STRICT_DYNAMIC, REPORT_SAMPLE, INLINE, HTTPS],
    "style-src": [SELF, NONCE, REPORT_SAMPLE],
    "connect-src": [SELF],
    "img-src": [SELF],
    "font-src": [SELF],
    "frame-ancestors": SELF,
    "block-all-mixed-content": true,
    // "require-trusted-types-for": [
    //   "script",
    // ],
  },
};
