export type BroadcastHandler = (data: Uint8Array) => void;

export interface SyncContext {
	id: Uint8Array
}

export interface CRDT {
	sync (data: Uint8Array | undefined, context: SyncContext): Uint8Array | undefined
	toValue (): unknown
	serialize? (): Uint8Array
	addBroadcaster? (broadcaster: BroadcastHandler): void
	onBroadcast?: BroadcastHandler
}

export interface CRDTConfig {
	id: Uint8Array
	generateTimestamp?: () => string
}

export type CreateCRDT<T extends CRDT=CRDT> = (config: CRDTConfig) => T;

export type Deserialize<T extends CRDT=CRDT> = (data: Uint8Array) => T;
