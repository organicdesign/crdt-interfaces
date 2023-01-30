export interface SyncContext {
    id: Uint8Array;
    syncId: number;
}
export interface CRDTSynchronizer {
    protocol: string;
    sync(data: Uint8Array | undefined, context: SyncContext): Uint8Array | undefined;
}
export type CreateSynchronizer<T extends CRDTSynchronizer = CRDTSynchronizer> = (components?: Record<string, unknown>) => T;
export interface SynchronizableCRDT extends CRDT {
    getSynchronizerProtocols(): Iterable<string>;
    getSynchronizer(protocol: string): CRDTSynchronizer | undefined;
}
export interface BroadcastData {
    protocol: string;
    data: Uint8Array;
}
export type BroadcastHandler = (data: BroadcastData) => void;
export interface CRDTBroadcaster {
    protocol: string;
    addBroadcaster(broadcaster: BroadcastHandler): void;
    onBroadcast: BroadcastHandler;
}
export type CreateBroadcaster<T extends CRDTBroadcaster = CRDTBroadcaster> = () => T;
export interface BroadcastableCRDT extends CRDT {
    getBroadcastProtocols(): Iterable<string>;
    getBroadCaster(protocol: string): CRDTBroadcaster;
}
export interface CRDTSerializer {
    protocol: string;
    serialize(): Uint8Array;
    deserialize(data: Uint8Array): void;
}
export type CreateSeralizer<T extends CRDTSerializer = CRDTSerializer> = () => T;
export interface SerializableCRDT extends CRDT {
    getSerializeProtocols(): Iterable<string>;
    getSerializer(protocol: string): CRDTSerializer;
}
export interface CRDT {
    id: Uint8Array;
    toValue(): unknown;
}
export interface CRDTConfig {
    id: Uint8Array;
    generateTimestamp?: () => number;
    synchronizers?: Iterable<CreateSynchronizer>;
    broadcasters?: Iterable<CreateBroadcaster>;
    serializers?: Iterable<CreateSeralizer>;
}
export type CreateCRDT<T extends CRDT = CRDT> = (config: CRDTConfig) => T;
