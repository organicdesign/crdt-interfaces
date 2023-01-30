export const isSynchronizable = (crdt) => crdt["getSynchronizer"] && crdt["getSynchronizerProtocols"];
export const toSynchronizable = (crdt) => isSynchronizable(crdt) ? crdt : null;
export const isSerializable = (crdt) => crdt["getSerializer"] && crdt["getSerializeProtocols"];
export const toSerializable = (crdt) => isSerializable(crdt) ? crdt : null;
export const isBroadcastable = (crdt) => crdt["getBroadCaster"] && crdt["getBroadcastProtocols"];
export const toBroadcastable = (crdt) => isBroadcastable(crdt) ? crdt : null;
