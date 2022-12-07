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

export type MMap<T> = Omit<Map<string, T>, "clear" | "delete" | typeof Symbol.toStringTag>;
export type BMap<T> = Omit<Map<string, T>, typeof Symbol.toStringTag>;

export type MSet<T> = Omit<Set<T>, "clear" | "delete" | typeof Symbol.toStringTag>;
export type BSet<T> = Omit<Set<T>, typeof Symbol.toStringTag>;