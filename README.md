# crdt-interfaces

Interfaces and types for various CRDTs to make compatibility between systems easier.

## Types and Interfaces

### CRDT Specific

#### CRDT

```typescript
import type { CRDT } from "crdt-interfaces";
```

The CRDT interface is a generalized interface that provides the minimum methods needed to replicate itself across instances to make it easy to create systems that can handle any CRDT following this interface. The interface also provides optional methods for features that are not stictly needed to ensure synchronization such as serialization and broadcasting.

#### CRDTConfig

```typescript
import type { CRDTConfig } from "crdt-interfaces";
```

This interface is a general purpose configuration object that many CRDTs will need to be created or instantiated.

#### CreateCRDT

```typescript
import type { CreateCRDT } from "crdt-interfaces";
```

This type is for a general purpose CRDT generator function.

### Data Type Specific

Data types generally have two types of prefixes: 'M' for 'Monotonic' and 'B' for "Bitonic". The Monotonic variations are types that are only increasing and therefore do not have methods for deletion/reduction. The Bitonic variations are types that can both increase and decrease, so they will include the methods for deletion/reduction. The interfaces where applicable were based of the native types for easy replacements of local types.

#### MCounter

```typescript
import type { MCounter } from "crdt-interfaces";
```

An interface for a monotonicly increasing counter such as GCounter.

#### BCounter

```typescript
import type { BCounter } from "crdt-interfaces";
```

An interface for a counter that can increase and decrease such as PNCounter

#### MSet

```typescript
import type { MSet } from "crdt-interfaces";
```

An interface based of the native Set type, modified for a grow only set such as GSet.

#### BSet

```typescript
import type { BSet } from "crdt-interfaces";
```

An interface based of the native Set type, modified for a set that can grow and shrink such as 2PSet or ORSet.

#### MMap

```typescript
import type { MMap } from "crdt-interfaces";
```

An interface based of the native Map type, modified for a map that can only assign key/value pairs such as CRDTMap.

#### BMap

```typescript
import type { BMap } from "crdt-interfaces";
```

An interface based of the native Map type, modified for a map that can both assign and clear key/value pairs such as LWWMap.

#### Register

```typescript
import type { Register } from "crdt-interfaces";
```

An interface for a register.

#### MVRegister

```typescript
import type { MVRegister } from "crdt-interfaces";
```

An interface for a multi-value register.
