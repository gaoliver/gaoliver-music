import type { Config } from '@react-router/dev/config';
import { PRERENDER_PATHS } from './site-routes.mjs';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: PRERENDER_PATHS,
} satisfies Config;
