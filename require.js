"use strict"

function xiaoye_require(fileID) {
	const path = require('path');
	const fs = require('fs');
	let filePath = path.join(__dirname, fileID);
	let dirPath = path.dirname(filePath)
	// 实现缓存机制
	xiaoye_require.cache = xiaoye_require.cache || {};
	if (xiaoye_require.cache[filePath]) {
		return xiaoye_require.cache[filePath].exports;
	}
	// 第一次请求，还没有缓存
	let module = {
		exports: {}
	}
	let exports = module.exports;
	// 去除请求文件的内容
	let code = fs.readFileSync(filePath, 'utf8', (err) => {
		if (err) throw err
	})
	// console.log(code)
	let str =
		`((xiaoye_require,module,exports)=>{
		${code}
	})(xiaoye_require,module,exports)`
	// 执行该代码
	eval(str);
	xiaoye_require.cache[filePath] = module
	return module.exports
}

let obj = xiaoye_require('./01.js')
console.log(obj)
