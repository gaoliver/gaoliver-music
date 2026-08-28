import { useState } from 'react';
import { Link } from 'react-router';
import { PageContentSurface, PageTitle } from '../../components/design-system';
import { albumCatalog } from '../../data';
import { allSongs } from '../../lib/discography';
import MainLayout from '../../templates/MainLayout';

export default function LyricsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const songs = allSongs(albumCatalog)
    .map(({ song }) => song)
    .filter((song) => song.lyrics && song.lyrics.length > 0);

  // Filter songs based on search query
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group songs by first letter
  const groupedSongs: Record<string, typeof songs> = {};
  filteredSongs.forEach((song) => {
    const firstLetter = song.title.charAt(0).toUpperCase();
    if (!groupedSongs[firstLetter]) {
      groupedSongs[firstLetter] = [];
    }
    groupedSongs[firstLetter].push(song);
  });

  // Sort groups alphabetically
  const sortedLetters = Object.keys(groupedSongs).sort();

  // Get unique first letters from all songs for filter
  const allLetters = Array.from(
    new Set(songs.map((song) => song.title.charAt(0).toUpperCase()))
  ).sort();

  return (
    <MainLayout>
      <PageTitle>Lyrics</PageTitle>
      <PageContentSurface aria-label="Song lyrics">
        {songs.length === 0 ? (
          <p className="text-[var(--shell-muted-light)]">No lyrics yet.</p>
        ) : (
          <div className="mx-auto max-w-[1000px]">
            {/* Search box */}
            <div className="mb-8">
              <label htmlFor="lyrics-search" className="sr-only">
                Search song
              </label>
              <input
                id="lyrics-search"
                type="text"
                placeholder="Search song"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-solid border-white/20 bg-transparent px-5 py-[15.25px] text-[18px] text-[var(--shell-text)] placeholder-[var(--shell-muted)] focus:outline-none"
                style={{ height: '61px' }}
              />
            </div>

            {/* Filter row */}
            <div className="mb-8 flex items-center justify-end gap-4">
              <span
                className="text-[16px] font-bold uppercase text-[var(--shell-text)]"
              >
                FILTER:
              </span>
              <div className="flex gap-3">
                {allLetters.map((letter) => (
                  <a
                    key={letter}
                    href={`#letter-${letter.toLowerCase()}`}
                    className="text-[16px] text-[var(--shell-muted)] transition-colors hover:text-brand-accentHover"
                  >
                    {letter}
                  </a>
                ))}
              </div>
            </div>

            {/* Songs grouped by letter */}
            {filteredSongs.length === 0 ? (
              <p className="text-[var(--shell-muted-light)]">No songs found.</p>
            ) : (
              <div className="space-y-12">
                {sortedLetters.map((letter) => (
                  <div key={letter}>
                    <h2
                      id={`letter-${letter.toLowerCase()}`}
                      className="mb-6 border-b border-white/15 pb-4 text-[48px] font-bold leading-none text-[var(--shell-text)]"
                    >
                      {letter}
                    </h2>
                    <ul className="space-y-4 pl-12">
                      {groupedSongs[letter]!.map((song) => (
                        <li key={song.id}>
                          <Link
                            to={`/lyrics/${song.id}`}
                            className="text-[24px] font-normal text-[var(--shell-text)] transition-colors hover:text-brand-accentHover"
                          >
                            {song.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </PageContentSurface>
    </MainLayout>
  );
}
