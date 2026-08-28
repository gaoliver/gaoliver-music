import type {
  AlbumCatalogContent,
  AlbumContent,
  SongContent,
  StreamingLinks,
} from "../types/content";

export interface SongWithAlbum {
  song: SongContent;
  album: AlbumContent;
}

export function findAlbum(
  catalog: AlbumCatalogContent,
  id: string | undefined,
): AlbumContent | undefined {
  return catalog.albums.find((album) => album.id === id);
}

export function findSong(
  catalog: AlbumCatalogContent,
  id: string | undefined,
): SongWithAlbum | undefined {
  for (const album of catalog.albums) {
    const song = album.songs?.find((item) => item.id === id);
    if (song) return { song, album };
  }
  return undefined;
}

export function allSongs(catalog: AlbumCatalogContent): SongWithAlbum[] {
  return catalog.albums.flatMap((album) =>
    album.songs?.map((song) => ({ song, album })),
  );
}

// A song's own links (e.g. a track's standalone single page) take priority
// over the album's - otherwise it inherits the album's streaming links.
export function songLinks(
  song: SongContent,
  album: AlbumContent,
): StreamingLinks {
  return song.links ?? album.links;
}

// Only meaningful for a single-song release: an album with several tracks
// has no one video to represent it, so the cover art is shown instead.
export function albumVideoId(album: AlbumContent): string | undefined {
  return album.songs?.length === 1 ? album.songs[0]!.videoId : undefined;
}
