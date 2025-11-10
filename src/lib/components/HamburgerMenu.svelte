<script>
  import { createEventDispatcher } from 'svelte';
  import IconButton from './IconButton.svelte';
  const dispatch = createEventDispatcher();

  export let iconSrc = './assets/hambuger_menu.png';
  export let altText = 'Open Menu';

  function toggleMenu() {
    dispatch('toggle');
  }
</script>

<IconButton iconSrc={iconSrc} altText={altText} onClick={toggleMenu} size="md" hoverEffect={true} />

<style>
  /* No specific styles needed here as IconButton handles its own styling */
</style>