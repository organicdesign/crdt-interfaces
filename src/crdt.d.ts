// Broadcast
export interface BroadcastData {
	protocol: string
	data: Uint8Array
}

export type BroadcastHandler = (data: BroadcastData) => void;

export interface CRDTBroadcaster {
	protocol: string
	addBroadcaster (broadcaster: BroadcastHandler): void
	onBroadcast: BroadcastHandler
}

export type CreateBroadcaster<T extends CRDTBroadcaster=CRDTBroadcaster> = () => T

// Sync
export interface SyncContext {
	id: Uint8Array
	syncId: number
}

export interface CRDTSynchronizer {
	protocol: string,
	sync (data: Uint8Array | undefined, context: SyncContext): Uint8Array | undefined
}

export type CreateSynchronizer<T extends CRDTSynchronizer=CRDTSynchronizer> = (components?: Record<string, any>) => T

// CRDT
export interface CRDT {
	id: Uint8Array
	toValue (): unknown

	getProtocols (): Iterable<string>
	getSynchronizer (protocol: string): CRDTSynchronizer | undefined

	serialize? (): Uint8Array
	deserialize? (data: Uint8Array): void

	addBroadcaster? (broadcaster: BroadcastHandler): void
	onBroadcast?: BroadcastHandler
}

export interface CRDTConfig {
	id: Uint8Array
	generateTimestamp?: () => number
	synchronizers: CreateSynchronizer[]
	broadcasters: CreateBroadcaster[]
}

export type CreateCRDT<T extends CRDT=CRDT> = (config: CRDTConfig) => T;
