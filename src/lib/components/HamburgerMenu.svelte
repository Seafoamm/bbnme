<script>
  import { createEventDispatcher } from 'svelte';
  import IconButton from './IconButton.svelte'; // Import IconButton
  const dispatch = createEventDispatcher();

  export let iconSrc = './assets/hambuger_menu.png'; // Default icon source
  export let altText = 'Open Menu';

  function toggleMenu() {
    dispatch('toggle');
  }
</script>

<IconButton iconSrc={iconSrc} altText={altText} onClick={toggleMenu} size="md" />

<style>
  /* No specific styles needed here as IconButton handles its own styling */
</style>