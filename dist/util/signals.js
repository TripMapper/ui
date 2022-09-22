import { useEffect } from 'react';
const _SignalListeners = {};
const DEBUG = process.env.NODE_ENV === 'development';
/**
 * Self incrementing bit (increments by 1 every time it's called)
 *
 * @returns {number}
 */
const iota = (i => () => 1 << ++i)(-1);
/**
 * The Event types
 *
 * @type {Object}
 */
export const Signal = {
    Notify: iota(),
    ShowReadonlyCard: iota(),
    HideReadonlyCard: iota(),
};
const bitsToSignals = Object.entries(Signal).reduce((a, [name, bit]) => {
    a[bit] = name;
    return a;
}, {});
/**
 * Registers a new signal, returns that signals bit
 *
 * const mySignal = RegisterSignal('MySignal');
 * Emit(mySignal) or Emit(Signals['MySignal']);
 *
 * @param {string} name
 * @return number
 */
export function RegisterSignal(name) {
    if (Signal.hasOwnProperty(name)) {
        DEBUG && console.warn('Tried adding a signal that already exists', name);
        return Signal[name];
    }
    DEBUG && console.log(`%cRegistered Signal:%c ${name}`, 'color:grey', '');
    return Signal[name] = iota();
}
/**
 * Trigger an event
 *
 * Emit(Signal.MyEventA, ...args);
 *
 * @param {number} event - A single event type
 * @param {...number} args
 */
export function Emit(event, ...args) {
    DEBUG && console.group('%cEmit %c' + bitsToSignals[event] + (args.length > 0 ? '%c:' : ''), 'color: grey;', 'font-weight: bold;', (args.length > 0 ? 'color: grey;' : ' '), ...args);
    const callbacks = Object.entries(_SignalListeners);
    let caught = false;
    for (let [bit, cbs] of callbacks) {
        if ((bit & event) === event) {
            for (let i = 0, l = cbs.length; i < l; i++) {
                caught = true;
                cbs[i](...args, event);
                DEBUG && console.log('%cListen%c', 'color: grey;', '', cbs[i]);
            }
        }
    }
    if (!caught && DEBUG)
        console.warn('Uncaught event:', bitsToSignals[event]);
    DEBUG && console.groupEnd();
}
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
export function Listen(event, func) {
    if (!_SignalListeners.hasOwnProperty(event))
        _SignalListeners[event] = [];
    _SignalListeners[event].push(func);
    return () => {
        const i = _SignalListeners[event].indexOf(func);
        if (i === -1)
            return;
        _SignalListeners[event].splice(i, 1);
    };
}
/**
 * Subscribe to an event via React Hook
 *
 * useListen(Signal.MyEventA|Signal.MyEventB, (...args) => {}, []);
 *
 * @param {number} event - One or more event types, Bitwise OR'd together
 * @param {Function} func
 * @param {Array} deps
 */
export function useListen(event, func, deps = []) {
    useEffect(() => Listen(event, func), deps);
}
