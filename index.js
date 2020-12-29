var path = require('path');

let validrnstyle = async function (opts) {
    if (!opts) opts = {};

    const fetch = require('node-fetch');
    const response = await fetch('https://raw.githubusercontent.com/vhpoet/react-native-styling-cheat-sheet/master/README.md');
    const body = await response.text();
    let _isGood = (property) => {
        return body.indexOf(property) !== -1;
    }
    if (opts.property) {
        console.log(_isGood(opts.property));
    }
    else {
        let fs = require('fs');
        console.log(opts['_'][0]);
        let content = fs.readFileSync(opts['_'][0], 'utf8');
        let json = JSON.parse(content);
        Object.keys(json).forEach((key) => {
            Object.keys(json[key]).forEach((property) => {
                if (!_isGood(property)) {
                    console.error(`Removing invalid ${property} under ${key}`);
                    delete json[key][property];
                }
            });
        });
        console.log(json);
    }

	return ;
    var fs = require('fs');
    var html = fs.readFileSync(path.join(opts.basedir,`${opts.infolder}/html`), 'utf-8');
    var css = fs.readFileSync(path.join(opts.basedir,`${opts.infolder}/css`), 'utf-8');
    var gulp = require('gulp');
    var sass = require('gulp-sass');
    sass.compiler = require('node-sass');
    function compileSass(done) {
        gulp.src(`${opts.infolder}/css`)
            .pipe(sass({
                outputStyle: 'nested', 
                includePaths: [
                    __dirname + '/node_modules/compass-mixins/lib'
                ]
            }).on('error', sass.logError))
            .pipe(gulp.dest(`${opts.infolder}/css.out`)).on('finish', function() {
                done();
            });
    }
    await new Promise((resolve, reject) => {
        compileSass(() => {
            resolve();
        })
    });

    css = fs.readFileSync(path.join(opts.basedir,`${opts.infolder}/css.out/css.css`), 'utf-8');

    /*
    var inliner = require('html-inline');
    var inline = inliner({ignoreImages: true});
    const Readable = require('stream').Readable;
    const s = new Readable();
    s._read = () => {}; 
    // var output = process.stdout;
    let stream = s.pipe(inline);//.pipe(output);
    s.push(`<!DOCTYPE html> <html> <head><link rel="stylesheet" href="./input/css" /> </head> <body>${html}</body> </html>`);
    s.push(null);

    let outStr = (stream) => {
        const chunks = []
        return new Promise((resolve, reject) => {
            stream.on('data', chunk => chunks.push(chunk))
            stream.on('error', reject)
            stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
        })
    };
    html = await outStr(s);*/
    // Fix inline CSS for after and before
    css = css.replace(/:after/g, "XXX")
        .replace(/:before/g, "YYY") ;
    // console.error(css);
    // xxx;

    html = `<!DOCTYPE html>
<html lang="en"> <head><style>${css}</style> </head> <body>${html}
<script src="/reload/reload.js"></script>
</body></html>`;
    if (opts.watch) {
        return html;
    }

    var inlineCss = require('inline-css');
    html = await inlineCss(html, {url: './'});
    const nr = /<body>([\s\S]*?)<\/body>/g.exec(html);
    html=nr[1];
    html = await inlinecss(html, opts);
    let myret = await convert(html, opts);
    console.log("React + Stylesheet has been stored to output folder!");
};

module.exports = {
    validrnstyle: validrnstyle
}
