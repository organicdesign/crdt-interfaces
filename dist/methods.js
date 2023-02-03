export const isSynchronizable = (crdt) => !!crdt["getSynchronizers"];
export const toSynchronizable = (crdt) => isSynchronizable(crdt) ? crdt : null;
export const isSerializable = (crdt) => !!crdt["getSerializers"];
export const toSerializable = (crdt) => isSerializable(crdt) ? crdt : null;
export const isBroadcastable = (crdt) => !!crdt["getBroadcasters"];
export const toBroadcastable = (crdt) => isBroadcastable(crdt) ? crdt : null;
const createModuleGetter = (toType, getModuleIterable) => {
    return (crdt, protocol) => {
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
};
export const getSynchronizer = createModuleGetter(toSynchronizable, crdt => crdt.getSynchronizers());
export const getBroadcaster = createModuleGetter(toBroadcastable, crdt => crdt.getBroadcasters());
export const getSerializer = createModuleGetter(toSerializable, crdt => crdt.getSerializers());
const createModuleProtocolsGetter = (toType, getModuleIterable) => {
    return (crdt) => {
        const asType = toType(crdt);
        if (asType == null) {
            return [];
        }
        return [...getModuleIterable(asType)].map(m => m.protocol);
    };
};
export const getSynchronizerProtocols = createModuleProtocolsGetter(toSynchronizable, crdt => crdt.getSynchronizers());
export const getSerializerProtocols = createModuleProtocolsGetter(toSerializable, crdt => crdt.getSerializers());
export const getBroadcasterProtocols = createModuleProtocolsGetter(toBroadcastable, crdt => crdt.getBroadcasters());
