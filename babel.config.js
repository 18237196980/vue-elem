const removeConsloeConfig = []
if (process.env.NODE_ENV === 'production') {
  removeConsloeConfig.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    ...removeConsloeConfig,
    '@babel/plugin-syntax-dynamic-import'
  ]
}
