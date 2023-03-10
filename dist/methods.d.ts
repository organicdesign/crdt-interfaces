import type { CRDT, SynchronizableCRDT, SerializableCRDT, BroadcastableCRDT, CRDTSynchronizer, CRDTSerializer, CRDTBroadcaster } from "./crdt.js";
export declare const isSynchronizable: (crdt: CRDT) => boolean;
export declare const toSynchronizable: (crdt: CRDT) => SynchronizableCRDT | null;
export declare const isSerializable: (crdt: CRDT) => boolean;
export declare const toSerializable: (crdt: CRDT) => SerializableCRDT | null;
export declare const isBroadcastable: (crdt: CRDT) => boolean;
export declare const toBroadcastable: (crdt: CRDT) => BroadcastableCRDT | null;
export declare const getSynchronizer: (crdt: CRDT, protocol: string) => CRDTSynchronizer | null;
export declare const getBroadcaster: (crdt: CRDT, protocol: string) => CRDTBroadcaster | null;
export declare const getSerializer: (crdt: CRDT, protocol: string) => CRDTSerializer | null;
export declare const getSynchronizerProtocols: (crdt: CRDT) => Iterable<string>;
export declare const getSerializerProtocols: (crdt: CRDT) => Iterable<string>;
export declare const getBroadcasterProtocols: (crdt: CRDT) => Iterable<string>;
