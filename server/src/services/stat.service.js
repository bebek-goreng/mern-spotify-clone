import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";

export const statService = async (params) => {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        Song.aggregate([
            {
                $unionWith: {
                    coll: "albums",
                    pipeline: [],
                },
            },
            {
                $group: {
                    _id: "$artist",
                },
            },
            {
                $count: "count",
            },
        ]),
    ]);

    const totalArtist = uniqueArtists[0]?.count || 0;

    return { totalSongs, totalAlbums, totalUsers, totalArtist }
}