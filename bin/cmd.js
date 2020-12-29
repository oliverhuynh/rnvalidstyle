#!/usr/bin/env node
'use strict';

require = require("esm")(module/*, options*/);
(async function() {
    var validrnstyleobj = require('../');
    let validrnstyle = validrnstyleobj.validrnstyle;
var fs = require('fs');
var path = require('path');
var minimist = require('minimist');

var argv = minimist(process.argv.slice(2), {
    alias: {
        p: 'property', h: 'help'
    },
    default: { property: '' }
});

if (argv.help) { 
	usage(0);
}
else {
	var inline = validrnstyle(argv);
}

function usage (code) {
    var r = fs.createReadStream(path.join(__dirname,'../README.md'));
    r.pipe(process.stdout);
    r.on('end', function () {
        if (code) process.exit(code);
    });
}

})();
