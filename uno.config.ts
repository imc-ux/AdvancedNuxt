import { defineConfig } from 'unocss';
import { mergeConfigs } from '@unocss/core';
import config from './.nuxt/uno.config.mjs';
import { presetUno, presetAttributify } from 'unocss';

export default mergeConfigs([
  config,
  {
    presets: [presetUno(), presetAttributify()],
  },
]);
