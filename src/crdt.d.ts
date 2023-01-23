export type BroadcastHandler = (data: Uint8Array) => void;

export interface SyncContext {
	id: Uint8Array
	syncId: number
}

export interface CRDTSynchronizer {
	protocol: string,
	sync (data: Uint8Array | undefined, context: SyncContext): Uint8Array | undefined
}

export interface CRDT {
	id: Uint8Array
	getProtocols (): Iterable<string>
	getSynchronizer (protocol: string): CRDTSynchronizer | undefined
	toValue (): unknown
	serialize? (): Uint8Array
	deserialize? (data: Uint8Array): void
	addBroadcaster? (broadcaster: BroadcastHandler): void
	onBroadcast?: BroadcastHandler
}

export interface CRDTConfig {
	id: Uint8Array
	generateTimestamp?: () => number
}

export type CreateCRDT<T extends CRDT=CRDT> = (config: CRDTConfig) => T;
export type CreateSynchronizer<T extends CRDTSynchronizer=CRDTSynchronizer> = (options?: Record<string, any>)  => T
