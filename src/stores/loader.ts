import { writable } from "svelte/store";

export const signing = writable(false); 

const showLoader = () => signing = true