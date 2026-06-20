class StripDTSPlugin {
  apply(compiler: any) {
    compiler.hooks.done.tap('StripDTSPlugin', (stats: any) => {
      const dir = stats.compilation.outputOptions.path;
      if (require('fs').existsSync(dir)) {
        const files = require('fs').readdirSync(dir);
        for (const file of files) {
          if (file.endsWith('.d.ts') || file.endsWith('.d.ts.map')) {
            require('fs').rmSync(require('path').join(dir, file), { force: true });
          }
        }
      }
    });
  }
}
module.exports = StripDTSPlugin;
