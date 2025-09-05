import { ClientSocketEvents } from '@party-quiz/shared/types/ClientSocketEvents';
import { ServerEvents } from '@party-quiz/shared/enums/ServerEvents';
import { io, Socket } from 'socket.io-client';

export type Listener<T> = (data: T) => void;

export class SocketManager {
  private socket: Socket | null = null;
  private token: string | null = null;

  public isInit: boolean = false;

  constructor() {}

  connect() {
    this.socket = io(process.env.NEXT_PUBLIC_WS_API_SOCKET_URL as string, {
      transports: ['websocket'],
      withCredentials: true,
    });

    this.isInit = true;

    this.socket.on('connect', () => {
      this.isInit = true;
    });

    this.socket.on('disconnect', () => {
      this.isInit = false;
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isInit = false;
    }
  }

  emitEvent = <T extends keyof ClientSocketEvents>(
    event: T,
    data: ClientSocketEvents[T],
  ): void => {
    if (!this.socket) return;

    this.socket.emit(event, data);
  };

  get instance(): Socket | null {
    return this.socket;
  }

  addListener<T>(event: ServerEvents, listener: Listener<T>): this {
    if (this.socket) this.socket.on(event, listener);

    return this;
  }

  removeListener<T>(event: ServerEvents, listener: Listener<T>): this {
    this.socket?.off(event, listener);

    return this;
  }

  isConnected(): boolean {
    return !!this.socket?.connected;
  }
}
