<script>
  import { getContext } from 'svelte';
  import { get } from 'svelte/store';
  import { fade } from 'svelte/transition'; // Re-import fade transition

  export let title; // Title of this tab panel

  const activeTabStore = getContext('activeTab');
  const registerTab = getContext('registerTab');

  let index; // The index of this tab panel

  // Register this tab panel with the Tabs component
  index = registerTab(title);

  // Reactive check to see if this tab is active
  $: isActive = $activeTabStore === index;
</script>

{#if isActive}
  <div class="tab-panel" transition:fade={{ duration: 200 }}> <!-- Re-apply fade transition -->
    <slot />
  </div>
{/if}

<style>
  .tab-panel {
    /* Add any specific styling for the tab panel content area */
  }
</style>