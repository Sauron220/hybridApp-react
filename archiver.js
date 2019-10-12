const fs = require('fs');
const archiver = require('archiver');
const build_tag_zip = 'AG_prd_v1.0.0';

const output = fs.createWriteStream(`${build_tag_zip}.zip`);
const archive = archiver('zip', {});

output.on('close', function () {
  console.log('压缩完成', archive.pointer() / 1024 / 1024 + ' M');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory('./dist', '', {});
archive.finalize();
