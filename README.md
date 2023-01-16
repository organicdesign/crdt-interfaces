# crdt-interfaces

Interfaces and types for various CRDTs to make compatibility between systems easier.

## Table of Contents

- [Install](#install)
- [Types and Interfaces](#types-and-interfaces)
  - [CRDT Specific](#crdt-specific)
    - [CRDT](#crdt)
    - [CRDTConfig](#crdtconfig)
    - [CreateCRDT](#createcrdt)
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

## Install

```
npm i --save-dev @organicdesign/crdt-interfaces
```

## Types and Interfaces

### CRDT Specific

#### CRDT

```typescript
import type { CRDT } from "@organicdesign/crdt-interfaces";
```

The CRDT interface is a generalized interface that provides the minimum methods needed to replicate itself across instances to make it easy to create systems that can handle any CRDT following this interface. The interface also provides optional methods for features that are not stictly needed to ensure synchronization such as serialization and broadcasting. The main part of this interface is the `sync` method which defines the actual synchronization protocol between instances.

#### CRDTConfig

```typescript
import type { CRDTConfig } from "@organicdesign/crdt-interfaces";
```

This interface is a general purpose configuration object that many CRDTs will need to be created or instantiated.

#### CreateCRDT

```typescript
import type { CreateCRDT } from "@organicdesign/crdt-interfaces";
```

This type is for a general purpose CRDT generator function.

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
