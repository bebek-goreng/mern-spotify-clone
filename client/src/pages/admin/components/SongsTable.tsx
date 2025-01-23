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
import { Calendar, Trash2 } from "lucide-react";

const SongsTable = () => {
  const { songs, isLoading, error, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-zinc-400">Loading songs...</div>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">
          Something went wrong, please refresh this page!
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {songs.map((song) => (
          <TableRow key={song._id} className="hover:bg-zinc-800/50">
            <TableCell>
              <img
                src={song.imageUrl}
                alt={song.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="h-4 w-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Trash2 className="size-4" color="#F87171" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-white">
                        Are you absolutely sure you want to delete this song?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="size-20 rounded object-cover"
                        />
                      </div>
                      <div className="flex flex-col text-white gap-2">
                        <h3 className="mb-1">
                          <span className="font-bold text-xs">Artist:</span>{" "}
                          {song.artist}
                        </h3>
                        <h3>
                          <span className="font-bold text-xs">Title:</span> {song.title}
                        </h3>
                        <h3>
                          <span className="font-bold text-xs">Release Date:</span>
                          <span> {song.createdAt.split("T")[0]}</span>
                        </h3>
                      </div>
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteSong(song._id)}>
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

export default SongsTable;
