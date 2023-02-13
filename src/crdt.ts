// Helpers
type UMap = Record<string, unknown>;

// Sync
export interface SyncContext {
	id: Uint8Array
	syncId: number
}

export interface CRDTSynchronizer {
	protocol: string,
	sync (data: Uint8Array | undefined, context: SyncContext): Uint8Array | undefined
}

export type CreateSynchronizer<C extends UMap=UMap, T extends CRDTSynchronizer=CRDTSynchronizer> = (components?: C) => T

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

export type CreateBroadcaster<C extends UMap=UMap, T extends CRDTBroadcaster=CRDTBroadcaster> = (components?: C) => T

export interface BroadcastableCRDT extends CRDT {
	getBroadcasters (): Iterable<CRDTBroadcaster>
}

// Serialize
export interface CRDTSerializer {
	protocol: string
	serialize (): Uint8Array
	deserialize (data: Uint8Array): void
}

export type CreateSerializer<C extends UMap=UMap, T extends CRDTSerializer=CRDTSerializer> = (components?: C) => T

export interface SerializableCRDT extends CRDT {
	getSerializers (): Iterable<CRDTSerializer>
}

// CRDT
export interface CRDT {
	id: Uint8Array
	isStarted (): Boolean
	start (): void | Promise<void>
	stop (): void | Promise<void>
	toValue (): unknown
}

export interface CRDTConfig<SyncComps extends UMap=UMap, BroadComps extends UMap=UMap, SerialComps extends UMap=UMap> {
	id: Uint8Array
	generateTimestamp?: () => number
	synchronizers?: Iterable<CreateSynchronizer<SyncComps>>
	broadcasters?: Iterable<CreateBroadcaster<BroadComps>>
	serializers?: Iterable<CreateSerializer<SerialComps>>
}

export type CreateCRDT<T extends CRDT=CRDT, Config extends CRDTConfig=CRDTConfig, Options extends {} = {}> = (config: Config, options?: Partial<Options>) => T;

// General
export interface ProtocolData {
	protocol: string
	data: Uint8Array
}

export type CRDTComponents<T extends Record<string, unknown>=Record<string, unknown>> = T

export type CompleteCRDT = CRDT & SynchronizableCRDT & BroadcastableCRDT & SerializableCRDT
