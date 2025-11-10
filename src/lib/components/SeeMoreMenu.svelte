<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';
  import IconButton from './IconButton.svelte'; // Import IconButton

  export let place; // The place object for context
  export let isAuthorizedToWrite = false; // From context

  const dispatch = createEventDispatcher();
  let isOpen = false;

  function toggleMenu(event) {
    event.stopPropagation(); // Prevent click from closing immediately
    isOpen = !isOpen;
  }

  function handleEdit() {
    dispatch('edit', place);
    isOpen = false;
  }

  function handleDelete() {
    dispatch('delete', place.id);
    isOpen = false;
  }

  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.see-more-menu')) {
      isOpen = false;
    }
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="see-more-menu">
  <IconButton
    iconSrc="./assets/see_more.png"
    altText="See More Options"
    onClick={toggleMenu}
    size="md"
  />

  {#if isOpen && isAuthorizedToWrite}
    <div class="dropdown-menu">
      <Button label="Edit" onClick={handleEdit} />
      <Button label="Delete" onClick={handleDelete} />
    </div>
  {/if}
</div>

<style>
  .see-more-menu {
    position: absolute; /* Position relative to the image wrapper */
    top: var(--spacing-xs);
    right: var(--spacing-xs);
    display: inline-block; /* Keep it inline-block for width calculation */
    z-index: 5; /* Ensure it's above the image */
  }

  .dropdown-menu {
    position: absolute;
    top: 100%; /* Position below the button */
    right: 0;
    background-color: var(--background-color);
    box-shadow: var(--box-shadow-md);
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--secondary-color);
    min-width: 120px;
    z-index: 10;
    display: flex;
    flex-direction: column;
    padding: var(--spacing-sm);
    gap: var(--spacing-xs);
  }

  .dropdown-menu button {
    width: 100%;
    justify-content: flex-start;
    padding: var(--spacing-xs) var(--spacing-sm);
    background-color: transparent;
    border: none;
    color: var(--text-color);
  }

  .dropdown-menu button:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
  }
</style>
