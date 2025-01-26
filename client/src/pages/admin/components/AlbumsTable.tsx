import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMusicStore } from "@/store/useMusicStore";
import { Calendar, Music, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AlbumsTable = () => {
  const { albums, deleteAlbum, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Year</TableHead>
          <TableHead>Songs</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={album.imageUrl}
                alt={album.title}
                className="w-10 h-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{album.title}</TableCell>
            <TableCell>{album.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {album.releaseYear}
              </span>
            </TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Music className="h-4 w-4" />
                {album.songs.length} songs
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 className="h-4 w-4" color="#F87171" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure you want to delete this album?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <img
                          src={album.imageUrl}
                          alt={album.title}
                          className="size-20 rounded object-cover"
                        />
                      </div>
                      <div className="flex flex-col text-white gap-2">
                        <h3 className="mb-1">
                          <span className="font-bold text-xs">Artist:</span>{" "}
                          {album.artist}
                        </h3>
                        <h3>
                          <span className="font-bold text-xs">Title:</span>{" "}
                          {album.title}
                        </h3>
                        <h3>
                          <span className="font-bold text-xs">
                            Release Date:
                          </span>
                          <span> {album.releaseYear}</span>
                        </h3>
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteAlbum(album._id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AlbumsTable;
