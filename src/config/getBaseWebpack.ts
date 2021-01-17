import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import Config from 'webpack-chain';
import ProgressPlugin from 'webpackbar';
import TerserPlugin from 'terser-webpack-plugin';
import TimeFixPlugin from 'time-fix-plugin';
import webpack from 'webpack';
import { getBabelConfig } from './getBabelConfig';
import { PluginContext } from '@alib/build-scripts/lib';



/**
 * 基本 webpack config 配置
 */
export const getBaseWebpackConfig = (context: PluginContext, options: any): Config => {
  const { rootDir } = context;
  const { name } = options;
  const config = new Config();
  const babelConfig = getBabelConfig();
  // webpack base config
  config.target('web');
  config.context(rootDir);
  config.resolve.extensions.merge(['.js', '.json', '.jsx', '.ts', '.tsx', '.html']);
  config.output.publicPath('/');

  // webpack module config
  config.module
  .rule('ts')
  .test(/\.ts$/)
  .use('babel-loader')
  .loader(require.resolve('babel-loader'))
  .options(babelConfig)
  .loader(require.resolve('ts-loader'))
  .end();

  // webpack plugin config
  config.plugin('caseSensitivePaths').use(CaseSensitivePathsPlugin);
  config
  .plugin('ProgressPlugin')
  .use(ProgressPlugin, [
    {
      color: '#F4AF3D',
      name: name || 'webpack',
    },
  ]);
  config.plugin('TimeFixPlugin').use(TimeFixPlugin);
  
  // webpack other config
  config.optimization
  .minimize(true) // 代码压缩配置
  .noEmitOnErrors(true) // 错误输出
  .end();

  return config;
}

export default {
  getBaseWebpackConfig,
};
