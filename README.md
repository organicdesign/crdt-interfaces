# crdt-interfaces

Interfaces and types for various CRDTs to make compatibility between systems easier.

## Table of Contents

- [Install](#install)
- [Types and Interfaces](#types-and-interfaces)
  - [CRDT Specific](#crdt-specific)
    - [CRDT](#crdt)
    - [CRDTConfig](#crdtconfig)
    - [SyncContext](#synccontext)
    - [CreateCRDT](#createcrdt)
    - [SynchronizableCRDT](#synchronizablecrdt)
    - [SerializableCRDT](#serializablecrdt)
    - [BroadcastableCRDT](#broadcastablecrdt)
  - [CRDT Modules](#crdt-modules)
    - [CRDTSynchronizer](#crdtsynchronizer)
    - [CRDTSerializer](#crdtserializer)
    - [CRDTBroadcaster](#crdtbroadcaster)
    - [CreateSynchronizer](#createsynchronizer)
    - [CreateSerializer](#createserializer)
    - [CreateBroadcaster](#createbroadcaster)
  - [Data Type Specific](#data-type-specific)
    - [MCounter](#mcounter)
    - [BCounter](#bcounter)
    - [MSet](#mset)
    - [BSet](#bset)
    - [MMap](#mmap)
    - [BMap](#bmap)
    - [MVMap](#mvmap)
    - [BRegister](#bregister)
    - [MVRegister](#mvregister)
- [Helpers](#helpers)
  - [isSynchronizable](#issynchronizable)
  - [isSerializable](#isserializable)
  - [isBroadcastable](#isbroadcastable)
  - [toSynchronizable](#tosynchronizable)
  - [toSerializable](#toserializable)
  - [toBroadcastable](#tobroadcastable)
  - [getSynchronizer](#getsynchronizer)
  - [getSerializer](#getserializer)
  - [getBroadcaster](#getbroadcaster)
  - [getSynchronizerProtocols](#getsynchronizerprotocols)
  - [getSerializerProtocols](#getserializerprotocols)
  - [getBroadcasterProtocols](#getbroadcasterprotocols)

## Install

```
npm i @organicdesign/crdt-interfaces
```

## Types and Interfaces

### CRDT Specific

#### CRDT

```typescript
import type { CRDT } from "@organicdesign/crdt-interfaces";
```

The CRDT interface is a generalized interface that provides the minimum methods needed to create a CRDT instance. This interface is really generic and is generally used to allow aggregation of different specific types of CRDTs.

#### CRDTConfig

```typescript
import type { CRDTConfig } from "@organicdesign/crdt-interfaces";

CRDTConfig<SyncComps, BroadComps, SerialComps>
```

- `SyncComps` `<Object>` The synchronizer components. Default: `{}`
- `BroadComps` `<Object>` The broadcaster components. Default: `{}`
- `SerialComps` `<Object>` The serializer components. Default: `{}`

This interface is a general purpose configuration object that many CRDTs will need to be created or instantiated.

#### SyncContext

```typescript
import type { SyncContext } from "@organicdesign/crdt-interfaces";
```

This SyncContext interface is for additional data to be passed to synchronizers to give them more flexibility.

#### CreateCRDT

```typescript
import type { CreateCRDT } from "@organicdesign/crdt-interfaces";
```

This type is for a general purpose CRDT generator function.

#### SynchronizableCRDT

```typescript
import type { SynchronizableCRDT } from "@organicdesign/crdt-interfaces";
```

The SynchronizableCRDT interface is an interface for a CRDT that can be synchronized using synchronization protocols.

#### SerializableCRDT

```typescript
import type { SerializableCRDT } from "@organicdesign/crdt-interfaces";
```

The SerializableCRDT interface is an interface for a CRDT that can be serialized and deserialized using serialization protocols.

#### BroadcastableCRDT

```typescript
import type { BroadcastableCRDT } from "@organicdesign/crdt-interfaces";
```

The BroadcastableCRDT interface is an interface for a CRDT that can be synchronized over broadcast using broadcast protocols.

### CRDT Modules

CRDTs can make use of modules passed via the CRDTConfig interface that add protocols to the CRDT for synchronization, serialization and/or broadcasting. These modules are defined external to the CRDT definition to make it easy to increase compatibility by adding other protocols and to make it easier to switch to more efficient protocols. These modules usually are for a specific type of CRDT, for example: GCounter.

#### CRDTSynchronizer

```typescript
import type { CRDTSynchronizer } from "@organicdesign/crdt-interfaces";
```

The CRDTSynchronizer interface defines a CRDT synchronizer protocol. The notable part of this interface is the `sync` method which defines how this protocol will behave.

#### CRDTSerializer

```typescript
import type { CRDTSerializer } from "@organicdesign/crdt-interfaces";
```

The CRDTSerializer interface defines a CRDT serialize protocol. These protocols allow you to serialize/deserialize CRDT data using a variety of protocols.

#### CRDTBroadcaster

```typescript
import type { CRDTBroadcaster } from "@organicdesign/crdt-interfaces";
```

The CRDTBroadcaster interface defines a CRDT broadcast protocol. These protocols usually have a `listenOnly` option to allow them to be disabled so you don't pollute the network with lots of broadcast messages containing the same data (you usually will only want one to be not in listen only mode), but the listen only broadcasters can interpret messages from a variety of protocols.

#### CreateSynchronizer

```typescript
import type { CreateSynchronizer } from "@organicdesign/crdt-interfaces";
```

The CreateSynchronizer interface is to make it easier to type CRDTSynchronizer creation methods.

#### CreateSerializer

```typescript
import type { CreateSerializer } from "@organicdesign/crdt-interfaces";
```

The CreateSerializer interface is to make it easier to type CRDTSerializer creation methods.

#### CreateBroadcaster

```typescript
import type { CreateBroadcaster } from "@organicdesign/crdt-interfaces";
```

The CreateBroadcaster interface is to make it easier to type CRDTBroadcaster creation methods.

### Data Type Specific

Data types generally have three types of prefixes: 'M' for 'Monotonic', 'B' for 'Bitonic' and 'MV' for 'MultiValue'. The Monotonic variations are types that are only increasing and therefore do not have methods for deletion/reduction. The Bitonic variations are types that can both increase and decrease, so they will include the methods for deletion/reduction. The MultiValue variations are types that return an array of values instead of a singular value so that CRDTs that only rely on logical time can return all values that occur at the same time and allow the client do decide how to handle it. The interfaces where applicable were based of the native types for easy replacements of local types.

#### MCounter

```typescript
import type { MCounter } from "@organicdesign/crdt-interfaces";
```

An interface for a monotonicly increasing counter such as GCounter.

#### BCounter

```typescript
import type { BCounter } from "@organicdesign/crdt-interfaces";
```

An interface for a counter that can increase and decrease such as PNCounter

#### MSet

```typescript
import type { MSet } from "@organicdesign/crdt-interfaces";
```

An interface based of the native Set type, modified for a grow only set such as GSet.

#### BSet

```typescript
import type { BSet } from "@organicdesign/crdt-interfaces";
```

An interface based of the native Set type, modified for a set that can grow and shrink such as 2PSet or ORSet.

#### MMap

```typescript
import type { MMap } from "@organicdesign/crdt-interfaces";
```

An interface based of the native Map type, modified for a map that can only assign key/value pairs such as CRDTMap.

#### BMap

```typescript
import type { BMap } from "@organicdesign/crdt-interfaces";
```

An interface based of the native Map type, modified for a map that can both assign and clear key/value pairs such as LWWMap.

#### MVMap

```typescript
import type { MVMap } from "@organicdesign/crdt-interfaces";
```

An interface based of the native Map type, modified for a map that can hold and return multiple values that are set at the same time.

#### BRegister

```typescript
import type { BRegister } from "@organicdesign/crdt-interfaces";
```

An interface for a register.

#### MVRegister

```typescript
import type { MVRegister } from "@organicdesign/crdt-interfaces";
```

An interface for a multi-value register.

## Helpers

This pacakge includes a few helper methods to assist with using these interfaces.

### isSynchronizable

```javascript
import { isSynchronizable } from "@organicdesign/crdt-interfaces";

isSynchronizable(crdt);
```

- `crdt` `<CRDT>` The CRDT to check.
- Returns: `<boolean>` True if the CRDT is synchronizable.

Check if a CRDT is synchronizable.

### isSerializable

```javascript
import { isSerializable } from "@organicdesign/crdt-interfaces";

isSerializable(crdt);
```

- `crdt` `<CRDT>` The CRDT to check.
- Returns: `<boolean>` True if the CRDT is serializable.

Check if a CRDT is serializable.

### isBroadcastable

```javascript
import { isBroadcastable } from "@organicdesign/crdt-interfaces";

isBroadcastable(crdt);
```

- `crdt` `<CRDT>` The CRDT to check.
- Returns: `<boolean>` True if the CRDT is broadcastable.

Check if a CRDT is broadcastable.

### toSynchronizable

```javascript
import { toSynchronizable } from "@organicdesign/crdt-interfaces";

toSynchronizable(crdt);
```

- `crdt` `<CRDT>` The CRDT to convert to synchronizable.
- Returns: `<SynchronizableCRDT>` | `<null>` The CRDT as a synchronizable CRDT or null.

Cast a CRDT to a synchronizable CRDT returning null if the CRDT is not synchronizable.

### toSerializable

```javascript
import { toSerializable } from "@organicdesign/crdt-interfaces";

toSerializable(crdt);
```

- `crdt` `<CRDT>` The CRDT to convert to serializable.
- Returns: `<SerializableCRDT>` | `<null>` The CRDT as a serializable CRDT or null.

Cast a CRDT to a serializable CRDT returning null if the CRDT is not serializable.

### toBroadcastable

```javascript
import { toBroadcastable } from "@organicdesign/crdt-interfaces";

toBroadcastable(crdt);
```

- `crdt` `<CRDT>` The CRDT to convert to broadcastable.
- Returns: `<BroadcastableCRDT>` | `<null>` The CRDT as a broadcastable CRDT or null.

Cast a CRDT to a broadcastable CRDT returning null if the CRDT is not broadcastable.

### getSynchronizer

```javascript
import { getSynchronizer } from "@organicdesign/crdt-interfaces";

getSynchronizer(crdt, protocol);
```

- `crdt` `<CRDT>` The CRDT to get the synchronizer from.
- `protocol` `<string>` The name of the protocol to get the synchronizer by.
- Returns: `<CRDTSynchronizer>` | `<null>` The CRDT synchronizer or null.

Get a CRDT synchronizer from a CRDT by protocol. Returns null if there is no matching synchronizer or if the CRDT is not synchronizable.

### getSerializer

```javascript
import { getSerializer } from "@organicdesign/crdt-interfaces";

getSerializer(crdt, protocol);
```

- `crdt` `<CRDT>` The CRDT to get the serializer from.
- `protocol` `<string>` The name of the protocol to get the serializer by.
- Returns: `<CRDTSerializer>` | `<null>` The CRDT serializer or null.

Get a CRDT serializer from a CRDT by protocol. Returns null if there is no matching serializer or if the CRDT is not serializable.

### getBroadcaster

```javascript
import { getBroadcaster } from "@organicdesign/crdt-interfaces";

getBroadcaster(crdt, protocol);
```

- `crdt` `<CRDT>` The CRDT to get the broadcaster from.
- `protocol` `<string>` The name of the protocol to get the broadcaster by.
- Returns: `<CRDTBroadcaster>` | `<null>` The CRDT broadcaster or null.

Get a CRDT broadcaster from a CRDT by protocol. Returns null if there is no matching broadcaster or if the CRDT is not broadcaster.

### getSynchronizerProtocols

```javascript
import { getSynchronizerProtocols } from "@organicdesign/crdt-interfaces";

getSynchronizerProtocols(crdt);
```

- `crdt` `<CRDT>` The CRDT to get the synchronizer protocols from.
- Returns: `<Iterable<string>>` The CRDT synchronizer protocols.

Get an iterable of the synchronizer protocols. Returns an empty iterable if the CRDT is not synchronizable.

### getSerializerProtocols

```javascript
import { getSerializerProtocols } from "@organicdesign/crdt-interfaces";

getSerializerProtocols(crdt);
```

- `crdt` `<CRDT>` The CRDT to get the serializer protocols from.
- Returns: `<Iterable<string>>` The CRDT serializer protocols.

Get an iterable of the serializer protocols. Returns an empty iterable if the CRDT is not serializable.

### getBroadcasterProtocols

```javascript
import { getBroadcasterProtocols } from "@organicdesign/crdt-interfaces";

getBroadcasterProtocols(crdt);
```

- `crdt` `<CRDT>` The CRDT to get the broadcaster protocols from.
- Returns: `<Iterable<string>>` The CRDT broadcaster protocols.

Get an iterable of the broadcaster protocols. Returns an empty iterable if the CRDT is not broadcastable.
