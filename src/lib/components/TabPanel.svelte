<script>
  import { getContext } from 'svelte';
  import { get } from 'svelte/store';
  import { fade } from 'svelte/transition';

  export let title; // Title of this tab panel
  export let iconSrc = ''; // New prop for icon source
  export let iconAltText = ''; // New prop for icon alt text

  const activeTabStore = getContext('activeTab');
  const registerTab = getContext('registerTab');

  let index; // The index of this tab panel

  // Register this tab panel with the Tabs component, passing icon info
  index = registerTab(title, iconSrc, iconAltText);

  // Reactive check to see if this tab is active
  $: isActive = $activeTabStore === index;
</script>

{#if isActive}
  <div class="tab-panel" transition:fade={{ duration: 200 }}>
    <slot />
  </div>
{/if}

<style>
  .tab-panel {
    /* Add any specific styling for the tab panel content area */
  }
</style>
