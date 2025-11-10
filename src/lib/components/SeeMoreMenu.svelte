<script>
  import { createEventDispatcher } from 'svelte';
  import Button from './Button.svelte';

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
  <button class="see-more-button" on:click={toggleMenu}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z" fill="var(--text-color)"/>
    </svg>
  </button>

  {#if isOpen && isAuthorizedToWrite}
    <div class="dropdown-menu">
      <Button label="Edit" onClick={handleEdit} />
      <Button label="Delete" onClick={handleDelete} />
    </div>
  {/if}
</div>

<style>
  .see-more-menu {
    position: relative;
    display: inline-block;
  }

  .see-more-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-xs);
    transition: var(--transition-ease);
    border-radius: var(--border-radius);
  }

  .see-more-button:hover {
    background-color: var(--secondary-color);
  }

  .see-more-button svg {
    display: block; /* Remove extra space below SVG */
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
