<script>
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import IconButton from './IconButton.svelte'; // Import IconButton

  export let activeTab = 1; // 0-indexed active tab, 1 for "Travel Wishlist"

  const activeTabStore = writable(activeTab);
  setContext('activeTab', activeTabStore);

  let tabs = []; // Stores { title, iconSrc, iconAltText } objects
  let tabTitles = []; // Stores just titles for display in headers

  // This function will be called by TabPanel children to register themselves
  function registerTab(title, iconSrc, iconAltText) {
    const tabInfo = { title, iconSrc, iconAltText };
    tabs = [...tabs, tabInfo];
    tabTitles = [...tabTitles, title]; // Keep original title for fallback
    return tabs.length - 1; // Return the index of the registered tab
  }

  setContext('registerTab', registerTab);

  function selectTab(index) {
    activeTab = index;
    activeTabStore.set(activeTab);
  }
</script>

<div class="tabs-container">
  <div class="tab-headers">
    {#each tabs as tab, i}
      <button
        class="tab-header"
        class:active={activeTab === i}
        on:click={() => selectTab(i)}
      >
        {#if tab.iconSrc}
          <IconButton iconSrc={tab.iconSrc} altText={tab.iconAltText} size="sm" isInteractive={false} hoverEffect={false} />
        {:else}
          {tab.title}
        {/if}
      </button>
    {/each}
  </div>
  <div class="tab-content-wrapper">
    <slot />
  </div>
</div>

<style>
  .tabs-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .tab-headers {
    display: flex;
    border-bottom: var(--border-width) solid var(--secondary-color);
    margin-bottom: var(--spacing-md);
  }

  .tab-header {
    background-color: var(--primary-color);
    color: var(--text-color);
    border: var(--border-width) solid transparent;
    border-bottom: none;
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    font-size: var(--font-size-md);
    font-family: var(--font-family);
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    transition: var(--transition-ease);
    margin-right: var(--spacing-xs);
    display: flex; /* For centering icon */
    align-items: center;
    justify-content: center;
  }

  .tab-header:hover:not(.active) {
    background-color: var(--secondary-color);
  }

  .tab-header.active {
    background-color: var(--background-color);
    border-color: var(--secondary-color);
    border-bottom-color: var(--background-color); /* Hide bottom border */
    font-weight: bold;
    color: var(--accent-color);
  }

  .tab-content-wrapper {
    position: relative;
    min-height: 200px; /* Prevent collapse during transitions, adjust as needed */
  }

  /* Target TabPanel components within the slot */
  .tab-content-wrapper :global(.tab-panel) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: var(--spacing-sm);
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow-sm);
    border: var(--border-width) solid var(--secondary-color);
  }
</style>
