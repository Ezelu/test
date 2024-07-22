const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');

const packages = [];
console.log(__dirname);
// packages.push(path.join(__dirname, './node_modules/@roqqu'));
// packages.push(path.join(__dirname, './roqqu-pkg'));
packages.push(path.join(__dirname, '../../Documents'));

// packages.push(path.join(__dirname, '../roqqu-css-test'));
// packages.push(path.join(__dirname, './path-to-another-shared-package')); //you can add as many as you need, but this gets slightly annoying

module.exports = {
  webpack: {
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName('babel-loader'));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
        
      }

      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin');

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);
      
    //   const regex = /\.m?js/
      webpackConfig = {
        ...webpackConfig,
        // module: {
        //     ...webpackConfig.module,
        //     rules: [
        //         {
        //             test: regex,
        //             type: "javascript/auto",
        //         },
        //         {
        //             test: regex,
        //             resolve: {
        //               fullySpecified: false,
        //             },
        //         } 
        //     ],
        // },
        resolve: {
          ...webpackConfig.resolve,
          alias: {
            ...webpackConfig.resolve.alias,
            react: path.resolve('./node_modules/react'),
          },
        },
      };
    
      
      return webpackConfig;
    },
  },
};