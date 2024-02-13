import {create} from "zustand";
import {io} from 'socket.io-client';

type SocketState = {
    socket: any;
    connect: (id: string | undefined) => void;
    disconnect: () => void;
};

export const useSocketStore = create<SocketState>((set) => ({
    socket: null,

    connect: (id) => {
        const socketInstance = io(`${process.env.WEBSOCKET_SERVER}`, {
            auth: {id},
        });
        set({socket: socketInstance});
    },

    disconnect: () => {
        set((state) => {
            if (state.socket) {
                state.socket.disconnect();
            }
            return {socket: null};
        });
    },
}));