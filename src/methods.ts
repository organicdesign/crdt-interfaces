import type {
	CRDT,
	SynchronizableCRDT,
	SerializableCRDT,
	BroadcastableCRDT,
	CRDTSynchronizer,
	CRDTSerializer,
	CRDTBroadcaster
} from "./crdt";

export const isSynchronizable = (crdt: CRDT): boolean => !!crdt["getSynchronizers"];

export const toSynchronizable = (crdt: CRDT): SynchronizableCRDT | null =>
	isSynchronizable(crdt) ? crdt as SynchronizableCRDT : null;

export const isSerializable = (crdt: CRDT): boolean => !!crdt["getSerializers"];

export const toSerializable = (crdt: CRDT): SerializableCRDT | null =>
	isSerializable(crdt) ? crdt as SerializableCRDT : null;

export const isBroadcastable = (crdt: CRDT): boolean => !!crdt["getBroadcasters"];

export const toBroadcastable = (crdt: CRDT): BroadcastableCRDT | null =>
	isBroadcastable(crdt) ? crdt as BroadcastableCRDT : null;

const createModuleGetter = <T extends CRDT, M extends CRDTSynchronizer | CRDTSerializer | CRDTBroadcaster>(
	toType: (crdt: CRDT) => T | null,
	getModuleIterable: (crdt: T) => Iterable<M>
) => (crdt: CRDT, protocol: string): M | null => {
	const asType = toType(crdt);

	if (asType == null) {
		return null;
	}

	for (const module of getModuleIterable(asType)) {
		if (module.protocol === protocol) {
			return module;
		}
	}

	return null;
};

export const getSynchronizer: (crdt: CRDT, protocol: string) => CRDTSynchronizer | null =
	createModuleGetter(toSynchronizable, crdt => crdt.getSynchronizers());

export const getBroadcaster: (crdt: CRDT, protocol: string) => CRDTBroadcaster | null =
	createModuleGetter(toBroadcastable, crdt => crdt.getBroadcasters());

export const getSerializer: (crdt: CRDT, protocol: string) => CRDTSerializer | null =
	createModuleGetter(toSerializable, crdt => crdt.getSerializers());

const createModuleProtocolsGetter = <T extends CRDT, M extends CRDTSynchronizer | CRDTSerializer | CRDTBroadcaster>(
	toType: (crdt: CRDT) => T | null,
	getModuleIterable: (crdt: T) => Iterable<M>
) => (crdt: CRDT): Iterable<string> => {
	const asType = toType(crdt);

	if (asType == null) {
		return [];
	}

	return [...getModuleIterable(asType)].map(m => m.protocol);
};

export const getSynchronizerProtocols: (crdt: CRDT) => Iterable<string> =
	createModuleProtocolsGetter(toSynchronizable, crdt => crdt.getSynchronizers());

export const getSerializerProtocols: (crdt: CRDT) => Iterable<string> =
	createModuleProtocolsGetter(toSerializable, crdt => crdt.getSerializers());

export const getBroadcasterProtocols: (crdt: CRDT) => Iterable<string> =
	createModuleProtocolsGetter(toBroadcastable, crdt => crdt.getBroadcasters());
