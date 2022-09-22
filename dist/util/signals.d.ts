/**
 * The Event types
 *
 * @type {Object}
 */
export declare const Signal: {
    Notify: number;
    ShowReadonlyCard: number;
    HideReadonlyCard: number;
};
/**
 * Registers a new signal, returns that signals bit
 *
 * const mySignal = RegisterSignal('MySignal');
 * Emit(mySignal) or Emit(Signals['MySignal']);
 *
 * @param {string} name
 * @return number
 */
export declare function RegisterSignal(name: string): number;
/**
 * Trigger an event
 *
 * Emit(Signal.MyEventA, ...args);
 *
 * @param {number} event - A single event type
 * @param {...number} args
 */
export declare function Emit(event: any, ...args: any[]): void;
/**
 * Subscribe to an event
 *
 * useEffect(
 *   () => Listen(Signal.MyEventA|Signal.MyEventB, (...args) => {}),
 *   []
 * );
 *
 * @param {number} event - One or more event types, Bitwise OR'd together
 * @param {Function} func
 * @return {function(): void} - The unsubscribe function
 */
export declare function Listen(event: any, func: any): () => void;
/**
 * Subscribe to an event via React Hook
 *
 * useListen(Signal.MyEventA|Signal.MyEventB, (...args) => {}, []);
 *
 * @param {number} event - One or more event types, Bitwise OR'd together
 * @param {Function} func
 * @param {Array} deps
 */
export declare function useListen(event: any, func: any, deps?: any[]): void;
