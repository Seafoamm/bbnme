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

<IconButton iconSrc={iconSrc} altText={altText} onClick={toggleMenu} size="md" hoverEffect={true} class="hamburger-icon-button" />

<style>
  .hamburger-icon-button :global(button) {
    transition: var(--transition-ease); /* Ensure transition applies to transform */
  }

  .hamburger-icon-button :global(button:hover) {
    /* Removed background-color: var(--secondary-color); */
    /* Removed box-shadow: var(--box-shadow-hover); */
    /* Removed transform: translateY(-5px) scale(1.1); */
  }
</style>
