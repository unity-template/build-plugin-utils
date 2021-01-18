import * as babelMerge from 'babel-merge';

export const getBabelConfig = () => {
  const baseConfig = {
    presets: [
      require.resolve('@babel/preset-flow'),
      [
        require.resolve('@babel/preset-env'),
        {
          loose: true,
          modules: false,
          include: [
            'transform-computed-properties',
          ],
        },
      ]
    ],
    plugins: [
      require.resolve('@babel/plugin-syntax-dynamic-import'),
      // Stage 0
      require.resolve('@babel/plugin-proposal-function-bind'),
      // Stage 1
      require.resolve('@babel/plugin-proposal-export-default-from'),
      [
        require.resolve('@babel/plugin-proposal-optional-chaining'),
        { loose: true },
      ],
      [
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        { loose: true },
      ],
      // Stage 2
      [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
      require.resolve('@babel/plugin-proposal-export-namespace-from'),
      // Stage 3
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        { loose: true },
      ],
      require.resolve('babel-plugin-minify-dead-code-elimination-while-loop-fixed'),
    ],
  };

  return babelMerge.all([baseConfig]);
};

export default {
  getBabelConfig,
}