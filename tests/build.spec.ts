import fs = require('fs-extra');
import path = require('path');
import { build } from '@alib/build-scripts';

describe('simple build test suite', () => {
  beforeAll(async () => {
    return await build({
      args: {},
      eject: false,
      rootDir: path.join(__dirname, 'fixtures/basic-utils/'),
      plugins: [path.join(__dirname, '../src/index.ts')],
      getBuiltInPlugins: () => [],
    });
  });
  test('check output source', () => {
    expect(fs.existsSync(path.join(__dirname, 'fixtures/basic-utils/build/index.js'))).toBe(true);
  });
});