var _ = require('lodash'),
    format = require('util').format,
    colors = require('colors/safe'),
    cliFormat = require('cli-format'),
    log,

    DebugReporter;

log = function (verb) {
    process.stdout.write(cliFormat.columns.wrap([{
        content: colors.gray(verb),
        width: 5
    }, format.apply(log, _.drop(arguments))]) + '\r\n');
};

/**
 * Debug Reporter
 *
 * @param {Object} newman - The collection run object with event handling hooks to enable reporting.
 * @_param {Object} reporterOptions - A set of reporter specific run options.
 * @_param {Object} options - A set of generic collection run options.
 * @returns {*}
 */
DebugReporter = function (newman /* , reporterOptions, options */) {
    newman.on('beforeRequest', function (err, args, run) {
        if (err) { return; }
        run.pause();

        log('req', '%s %s', args.request.method, args.request.url.toString());


        process.stdin.once('data', function () {
            run.resume();
        });
    });

    newman.on('request', function (err, args, run) {
        if (err) { return; }
        run.pause();

        log('res', '%s %s', args.response.code, args.response.reason());


        process.stdin.once('data', function () {
            run.resume();
        });
    });
};

module.exports = DebugReporter;
