import type { CRDT } from "./crdt";

export const isSynchronizable = (crdt: CRDT) => crdt["getSynchronizer"] && crdt["getSynchronizerProtocols"];
