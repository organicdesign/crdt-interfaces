import type { CRDT, SynchronizableCRDT, SerializableCRDT, BroadcastableCRDT } from "./crdt";

export const isSynchronizable = (crdt: CRDT) => crdt["getSynchronizer"] && crdt["getSynchronizerProtocols"];

export const toSynchronizable = (crdt: CRDT): SynchronizableCRDT | null =>
	isSynchronizable(crdt) ? crdt as SynchronizableCRDT : null;

export const isSerializable = (crdt: CRDT) => crdt["getSerializer"] && crdt["getSerializeProtocols"];

export const toSerializable = (crdt: CRDT): SerializableCRDT | null =>
	isSerializable(crdt) ? crdt as SerializableCRDT : null;

export const isBroadcastable = (crdt: CRDT) => crdt["getBroadcaster"] && crdt["getBroadcastProtocols"];

export const toBroadcastable = (crdt: CRDT): BroadcastableCRDT | null =>
	isBroadcastable(crdt) ? crdt as BroadcastableCRDT : null;
