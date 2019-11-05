const path = require('path');

module.exports = ({ actions, stage, loaders }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, '../../components/'),
        '@icons': path.resolve(__dirname, '../../icons/'),
        '@styles': path.resolve(__dirname, '../../styles/'),
        '@utils': path.resolve(__dirname, '../../utils/'),
        '@types': path.resolve(__dirname, '../../types/'),
      },
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    ...(stage === 'build-html' && {
      module: {
        rules: [
          {
            test: /algs4/,
            use: loaders.null(),
          },
        ],
      },
    }),
  });
};
