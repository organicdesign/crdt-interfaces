import type { CRDT, SynchronizableCRDT, SerializableCRDT, BroadcastableCRDT } from "./crdt";
export declare const isSynchronizable: (crdt: CRDT) => any;
export declare const toSynchronizable: (crdt: CRDT) => SynchronizableCRDT | null;
export declare const isSerializable: (crdt: CRDT) => any;
export declare const toSerializable: (crdt: CRDT) => SerializableCRDT | null;
export declare const isBroadcastable: (crdt: CRDT) => any;
export declare const toBroadcastable: (crdt: CRDT) => BroadcastableCRDT | null;
