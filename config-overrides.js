const {
  override,
  fixBabelImports,
  addBabelPlugins,
  addLessLoader
} = require('customize-cra')

module.exports = override(
  addLessLoader({
    strictMath: true,
    noIeCompat: true
  }),
  ...addBabelPlugins(['@babel/plugin-proposal-decorators', { legacy: true }]),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    libraryDirectory: 'es',
    style: 'css'
  })
)

// 'antd'
// module.exports = override(
//   fixBabelImports('import', {
//     libraryName: 'antd',
//     libraryDirectory: 'es',
//     style: 'css'
//   })
// )
