import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  ssr: false,
  prerender: ['/', '/about', '/releases', '/contact', '/404'],
} satisfies Config;
