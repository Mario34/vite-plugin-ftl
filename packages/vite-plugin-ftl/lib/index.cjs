'use strict';

var fs = require('fs');
var FTL = require('freemarker.js');

function VitePluginFtl(options) {
    const { ftlOptions, autoLoadData = false } = options ?? {};
    const ftl = new FTL({
        viewRoot: '/',
        options: ftlOptions,
    });
    async function transformFtl(file) {
        let ftlData = {};
        let resultLines = [];
        if (autoLoadData) {
            const ftlDataFilePath = `${file}.json`;
            if (!fs.existsSync(ftlDataFilePath)) {
                throw new Error(`${ftlDataFilePath}.json is not found. If you want close auto load data, please set 'autoLoadData' false.`);
            }
            ftlData = JSON.parse(fs.readFileSync(`${file}.json`, { encoding: 'utf-8' }));
            resultLines.push(`import json from '${file}.json';`);
        }
        const render = (name, data = {}) => new Promise((resolve, reject) => {
            ftl.render(name, data, (err, html) => {
                if (err) {
                    reject(err);
                }
                resolve(html);
            });
        });
        const result = await render(file, ftlData);
        resultLines.push(`const ftl = ${JSON.stringify(result)};export default ftl;`);
        return resultLines.join('');
    }
    return {
        name: 'vite-plugin-ftl',
        enforce: 'pre',
        async transform(content, file) {
            if (!/\.ftl$/.test(file)) {
                return;
            }
            return await transformFtl(file);
        },
    };
}

module.exports = VitePluginFtl;
