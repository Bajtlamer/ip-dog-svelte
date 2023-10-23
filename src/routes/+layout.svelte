<script lang="ts">
  import { page } from '$app/stores';
  import { menuitems } from "./pages.json";
  import Modal from '../modals/basic.svelte';
  import LoginForm from '../forms/login.svelte';
  import type { PageData } from './$types';
	import "../app.css";

	export let data: PageData;

  let showModal = false;
  let open = false;
</script>

<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="/" class="flex items-center">
      <img src="./logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IP-dog</span>
  </a>
  <div class="flex md:order-2">
    {#if !data.user}
      <button type="button" on:click={() => (showModal = true)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block">Sign In</button>
    {:else}
      <span class="self-center text-sm font-semibold whitespace-nowrap dark:text-white pr-4">{data.user?.email}</span>
      <form action="/logout" method="POST">
        <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hidden md:block">Logout</button>
      </form>
    {/if}
      <button on:click={()=>{open = !open}} data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={open}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden={open} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div class="items-center justify-between w-full md:flex md:w-auto md:order-1 {open ? 'display' : 'hidden'}" id="navbar-cta">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {#each menuitems as { item, route }}
      <li class="flex-grow-1 w-1/4 text-center">
        <a href={route} on:click={() => (open = !open)} class:active={$page.url.pathname === route}
          class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{item}</a
        >
      </li>
    {/each}
    </ul>
  </div>
  </div>
</nav>

<Modal bind:showModal>
  <LoginForm />
</Modal>

<style>
  .active {
    color: blue;
  }
</style>

<slot />
