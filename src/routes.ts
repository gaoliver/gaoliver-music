import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('about', 'routes/about.tsx'),
  route('about/story', 'routes/about-story.tsx'),
  route('about/timeline', 'routes/about-timeline.tsx'),
  route('releases', 'routes/releases.tsx'),
  route('releases/:slug', 'routes/release-detail.tsx'),
  route('videos', 'routes/videos.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
