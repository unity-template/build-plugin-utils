import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import * as Config from 'webpack-chain';
import * as TimeFixPlugin from 'time-fix-plugin';
import { getBabelConfig } from './getBabelConfig';
import { PluginContext } from '@alib/build-scripts/lib';



/**
 * 获取基本 webpack config 配置
 * @returns {@link Config} webpack-chain相关配置
 */
export const getBaseWebpackConfig = (context: PluginContext, options: any): Config => {
  const { rootDir } = context;
  const { name } = options;
  const config = new Config();
  const babelConfig = getBabelConfig();
  // webpack base config
  config.target('web');
  config.context(rootDir);
  config.resolve.extensions.merge(['.js', '.json', '.jsx', '.ts', '.html']);
  config.output.publicPath('/');

  // webpack module config
  config.module
  .rule('ts')
  .test(/\.ts$/)
  .use('babel-loader')
  .loader(require.resolve('babel-loader'))
  .options(babelConfig)
  .end()
  .use('ts-loader')
  .loader(require.resolve('ts-loader'))

  // webpack plugin config
  config.plugin('caseSensitivePaths').use(CaseSensitivePathsPlugin);
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
