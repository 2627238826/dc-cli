const fs = require('fs-extra');
const path = require('path');

// 删除文件
exports.deleteRemovedFiles = function(directory, filesToDelete) {
  return Promise.all(
    filesToDelete.map(filename => {
      const realPath = path.join(directory, filename);
      if (fs.existsSync(realPath)) {
        return fs.unlink(realPath);
      }
    })
  );
};

exports.writeFileTree = async function(dir, files, filesToDelete) {
  // 写入文件
  Object.keys(files).forEach(name => {
    // 待写入文件的路径
    const filePath = path.join(dir, name);
    // 确保目录存在
    fs.ensureDirSync(path.dirname(filePath));
    // 写入内容
    fs.writeFileSync(filePath, files[name]);
  });
  if (filesToDelete) {
    await exports.deleteRemovedFiles(dir, filesToDelete);
  }
};
