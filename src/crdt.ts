// Sync
export interface SyncContext {
	id: Uint8Array
	syncId: number
}

export interface CRDTSynchronizer {
	protocol: string,
	sync (data: Uint8Array | undefined, context: SyncContext): Uint8Array | undefined
}

export type CreateSynchronizer<T extends CRDTSynchronizer=CRDTSynchronizer> = (components?: Record<string, unknown>) => T

export interface SynchronizableCRDT extends CRDT {
	getSynchronizers (): Iterable<CRDTSynchronizer>
}

// Broadcast
export type BroadcastHandler = (data: Uint8Array) => void;

export interface CRDTBroadcaster {
	protocol: string
	onBroadcast: BroadcastHandler
	setBroadcast: (broadcast: BroadcastHandler) => void
}

export type CreateBroadcaster<T extends CRDTBroadcaster=CRDTBroadcaster> = (components?: Record<string, unknown>) => T

export interface BroadcastableCRDT extends CRDT {
	getBroadcasters (): Iterable<CRDTBroadcaster>
}

// Serialize
export interface CRDTSerializer {
	protocol: string
	serialize (): Uint8Array
	deserialize (data: Uint8Array): void
}

export type CreateSerializer<T extends CRDTSerializer=CRDTSerializer> = (components?: Record<string, unknown>) => T

export interface SerializableCRDT extends CRDT {
	getSerializers (): Iterable<CRDTSerializer>
}

// CRDT
export interface CRDT {
	id: Uint8Array
	toValue (): unknown
}

export interface CRDTConfig {
	id: Uint8Array
	generateTimestamp?: () => number
	synchronizers?: Iterable<CreateSynchronizer>
	broadcasters?: Iterable<CreateBroadcaster>
	serializers?: Iterable<CreateSerializer>
}

export type CreateCRDT<T extends CRDT=CRDT> = (config: CRDTConfig) => T;

// General
export interface ProtocolData {
	protocol: string
	data: Uint8Array
}
