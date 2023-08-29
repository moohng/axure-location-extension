const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const manifest = require('../public/manifest.json');
const { name: zipName, version } = require('../package.json');

const bundleName = `${zipName}_v${version}`;

const output = fs.createWriteStream(path.resolve(`dist/${bundleName}.zip`));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function () {
  console.log('压缩完成：', archive.pointer() + 'bytes');
});

archive.pipe(output);

// 写入资源脚本文件
archive.directory(path.resolve('dist/output/'), bundleName);

// 写入manifest文件
if (!manifest.version) {
  manifest.version = version;
}
archive.append(JSON.stringify(manifest), { name: bundleName + '/manifest.json' });

archive.finalize();
