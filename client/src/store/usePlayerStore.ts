import { create } from "zustand";
import { Song } from "@/types";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    intitializeQueue: (songs: Song[], startIndex?: number) => void;
    playAlbum: (songs: Song[], startIndex?: number) => void;
    setuCurrentSong: (song: Song | null) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    intitializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentSong: get().currentSong || songs[0],
            currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex
        });
    },


    playAlbum: (songs: Song[], startIndex = 0) => {
        if (songs.length === 0) return;

        const song = songs[startIndex];
        const socket = useChatStore.getState().socket;

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            });
        }

        set({
            queue: songs,
            currentSong: song,
            currentIndex: startIndex,
            isPlaying: true,
        });
    },


    setuCurrentSong: (song: Song | null) => {
        if (!song) return;

        const songIndex = get().queue.findIndex((s) => s._id === song._id);
        const socket = useChatStore.getState().socket;

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: `Playing ${song.title} by ${song.artist}`
            });
        }

        set({
            currentSong: song,
            isPlaying: true,
            currentIndex: songIndex !== -1 ? songIndex : get().currentIndex
        });
    },


    togglePlay: () => {
        const willStartPlaying = !get().isPlaying;
        const currentSong = get().currentSong;
        const socket = useChatStore.getState().socket;

        if (socket.auth) {
            socket.emit("update_activity", {
                userId: socket.auth.userId,
                activity: willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : `Idle`
            });
        }

        set({
            isPlaying: willStartPlaying,
        });
    },


    playNext: () => {
        const { currentIndex, queue } = get();
        const nextIndex = currentIndex + 1;

        if (nextIndex < queue.length) {
            const nextSong = queue[nextIndex];
            const socket = useChatStore.getState().socket;

            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${nextSong.title} by ${nextSong.artist}`
                });
            }
            set({
                currentSong: nextSong,
                isPlaying: true,
                currentIndex: nextIndex
            });
        } else {
            set({
                isPlaying: false,
            });

            const socket = useChatStore.getState().socket;

            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                });
            }
        }
    },


    playPrevious: () => {
        const { currentIndex, queue } = get();
        const prevIndex = currentIndex - 1;

        if (prevIndex >= 0) {
            const prevSong = queue[prevIndex];
            const socket = useChatStore.getState().socket;

            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Playing ${prevSong.title} by ${prevSong.artist}`
                });
            }
            set({
                currentSong: prevSong,
                isPlaying: true,
                currentIndex: prevIndex
            });
        } else {
            set({
                isPlaying: false,
            });

            const socket = useChatStore.getState().socket;

            if (socket.auth) {
                socket.emit("update_activity", {
                    userId: socket.auth.userId,
                    activity: `Idle`
                });
            }
        }
    },
}));