import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('shows', 'routes/shows.tsx'),
  route('about', 'routes/about.tsx'),
  route('about/story', 'routes/about-story.tsx'),
  route('about/timeline', 'routes/about-timeline.tsx'),
  route('releases', 'routes/releases.tsx'),
  route('releases/:slug', 'routes/release-detail.tsx'),
  route('videos', 'routes/videos.tsx'),
  route('lyrics', 'routes/lyrics.tsx'),
  route('lyrics/:slug', 'routes/lyrics-detail.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig;
