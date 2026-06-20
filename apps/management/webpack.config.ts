import { composePlugins, withNx } from '@nx/webpack';
import { withModuleFederation } from '@nx/module-federation/angular';
import moduleFederationConfig from './module-federation.config';

const StripDTSPlugin = require('../../strip-dts-plugin');

export default (config, context) => {
  config.externals = config.externals || {};
  config.externals['ws'] = 'commonjs ws';
  config.externals['isomorphic-ws'] = 'commonjs isomorphic-ws';

  const cfg = composePlugins(
    withNx(),
    withModuleFederation(moduleFederationConfig, { dts: false })
  )(config, context);

  cfg.devServer = cfg.devServer || {};
  cfg.devServer.client = false;
  cfg.devServer.hot = false;

  if (cfg.plugins) {
    cfg.plugins = cfg.plugins.filter(plugin => {
      if (!plugin) return false;
      const name = plugin?.constructor?.name || '';
      const skip = name.includes('DTSPlugin') ||
                   name.includes('dts-plugin') ||
                   name.includes('ForkTsChecker') ||
                   name.includes('DTSManager');
      return !skip;
    });
  }

  cfg.plugins = cfg.plugins || [];
  cfg.plugins.push(new StripDTSPlugin());

  return cfg;
};
