export const isSynchronizable = (crdt) => crdt["getSynchronizer"] && crdt["getSynchronizerProtocols"];
