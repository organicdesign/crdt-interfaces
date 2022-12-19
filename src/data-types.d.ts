export interface MCounter {
	increment (quantity: number): void
}

export interface BCounter extends MCounter {
	decrement (quantity: number): void
}

export interface Register<T> {
	get (): T | undefined
	set (value: T): void
	clear (): void
}

export interface MVRegister<T> {
	get (): T[] | undefined
	set (value: T): void
	clear (): void
}

export interface MVMap<T> extends Omit<Map<string, T>, "get" | "forEach" | "get" | "set" | "entries" | "values" | typeof Symbol.iterator | typeof Symbol.toStringTag> {
	[Symbol.iterator](): IterableIterator<[string, T[]]>
	forEach(callbackfn: (value: T[], key: string, map: Map<string, T[]>) => void, thisArg?: any): void
	get(key: string): T[] | undefined
	set(key: string, value: T): Map<string, T[]>
	entries(): IterableIterator<[string, T[]]>
	values(): IterableIterator<T[]>
}

export interface MMap<T> extends Omit<Map<string, T>, "clear" | "delete" | "set" | typeof Symbol.toStringTag> {
	set (key: string, value: NonNullable<T>): Map<string, T>
}

export type BMap<T> = Omit<Map<string, T>, typeof Symbol.toStringTag>;

export type MSet<T> = Omit<Set<T>, "clear" | "delete" | typeof Symbol.toStringTag>;
export type BSet<T> = Omit<Set<T>, typeof Symbol.toStringTag>;
