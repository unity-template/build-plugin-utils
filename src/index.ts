import { IPlugin } from "@alib/build-scripts";
import { CliCommand } from './const';
import { getBaseWebpackConfig } from './config/getBaseWebpack';

const plugin: IPlugin = ({
  registerTask,
  registerUserConfig,
  context,
  onHook,
  registerCliOption,
  onGetWebpackConfig,
  onGetJestConfig,
  modifyUserConfig,
  log,
  registerMethod,
  setValue,
}) => {
  const webpackConfig = getBaseWebpackConfig(context, {});
  registerTask('utils-build', webpackConfig);
};

export default plugin;
