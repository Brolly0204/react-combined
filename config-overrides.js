const { override, fixBabelImports, addBabelPlugins } = require('customize-cra')

module.exports = override(
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
