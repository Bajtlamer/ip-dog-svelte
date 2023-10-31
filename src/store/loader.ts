import { writable } from "svelte/store";

export const signing = writable(false); 

// export const showLoader = (st:boolean) => signing.set(st)