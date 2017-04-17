var sdk = require('postman-collection'),

    HTTPReporter;

/**
 * Fills your collection run (read life) with a bunch of Emojis 😀.
 *
 * @param {Object} newman - The collection run object with event handling hooks to enable reporting.
 * @param {Object} reporterOptions - A set of reporter specific run options.
 * @param {Object} options - A set of generic collection run options.
 * @returns {*}
 */
/* eslint-disable no-console */
HTTPReporter = function (newman, reporterOptions, options) {
    if (options.silent || reporterOptions.silent) {
        return;
    }

    newman.on('start', function () {
        console.log(`\n\nRunning Collection \x1b[31m${options.collection.name}\x1b[0m\n\n`);
    });

    newman.on('beforeItem', function (err, o) {
        console.log('\x1b[2mSending Postman Request:', o.item.name, '\x1b[0m');
    });

    newman.on('item', function (err, o) {
        console.log('\x1b[2mCompleted Postman Request:', o.item.name, '\x1b[0m');
    });

    newman.on('http', function (err, o) {
        var req = o.request,
            res = o.response;

        console.log('\x1b[32m');
        console.log(`${req.method.toUpperCase()} ${req.url.getPath()} HTTP/1.1`);
        console.log(sdk.Header.unparse(req.headers) + '\n');
        console.log(`\x1b[0m\x1b[33mHTTP/1.1 ${res.code} ${res.status}`);
        console.log(sdk.Header.unparse(res.headers) + '\n');
        console.log(res.stream.toString());
        console.log('\x1b[0m');
    });
};
/* eslint-enable no-console */

HTTPReporter.prototype.dominant = true;
module.exports = HTTPReporter;
