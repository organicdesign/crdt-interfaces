## [4.0.0](https://github.com/organicdesign/crdt-interfaces/compare/v4.0.0...v5.0.0) (2023-02-13)

### Changed

* Added methods to the `CRDT` iterface:
	* `isStarted`
	* `start`
	* `stop`

## [4.0.0](https://github.com/organicdesign/crdt-interfaces/compare/v3.0.0...v4.0.0) (2023-02-08)

### Added

* CRDT module types:
  * `CRDTSynchronizer`
  * `CRDTBroadcaster`
  * `CRDTSerializer`
* CRDT module creation types:
  * `CreateSynchronizer`
  * `CreateSerializer`
  * `CreateBroadcaster`
* CRDT variations:
  * `SynchronizableCRDT`
  * `BroadcastableCRDT`
  * `SerializableCRDT`
* Other types:
  * `ProtocolData`
  * `CompleteCRDT`
* CRDT helpers:
  * `isSynchronizable`
  * `isSerializable`
  * `isBroadcastable`
  * `toSynchronizable`
  * `toSerializable`
  * `toBroadcastable`
  * `getSynchronizer`
  * `getSerializer`
  * `getBroadcaster`
  * `getSynchronizerProtocols`
  * `getSerializerProtocols`
  * `getBroadcasterProtocols`

### Removed

* Removed methods from `CRDT` type:
  * `sync`
  * `serialize`
  * `addBroadcaster`
  * `onBroadcast`

## [3.0.0](https://github.com/organicdesign/crdt-interfaces/compare/v2.0.2...v3.0.0) (2023-01-24)

### Added

* package-lock.json

## [2.0.2](https://github.com/organicdesign/crdt-interfaces/compare/v2.0.1...v2.0.2) (2023-01-17)

### Added

* Add table of contents to readme.

## [2.0.1](https://github.com/organicdesign/crdt-interfaces/compare/v2.0.0...v2.0.1) (2023-01-12)

### Added

* Add note to readme about how the crdt sync works.

## [2.0.0](https://github.com/organicdesign/crdt-interfaces/compare/v1.0.1...v2.0.0) (2023-01-11)

### Changed

* `generateTimestamp` in `CRDTConfig` now returns a number instead of a string.

## [1.0.1](https://github.com/organicdesign/crdt-interfaces/compare/v1.0.0...v1.0.1) (2023-01-10)

### Fixed

* Update readme title.

## 1.0.0 (2023-01-10)

### Added

* Added CRDT interfaces.
* Added standard collection interfaces.
