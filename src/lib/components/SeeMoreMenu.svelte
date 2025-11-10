<script>
  import { createEventDispatcher } from 'svelte';
  import IconButton from './IconButton.svelte';

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

  {#if isAuthorizedToWrite}
    <div class="floating-actions" class:open={isOpen}>
      <IconButton iconSrc="./assets/edit.png" altText="Edit" onClick={handleEdit} size="sm" />
      <IconButton iconSrc="./assets/delete.png" altText="Delete" onClick={handleDelete} size="sm" />
    </div>
  {/if}
</div>

<style>
  .see-more-menu {
    position: absolute;
    top: var(--spacing-xs);
    right: var(--spacing-xs);
    display: inline-block;
    z-index: 5;
  }

  .floating-actions {
    position: absolute;
    top: 100%; /* Position below the see-more button */
    right: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    opacity: 0;
    transform: translateY(-10px); /* Start slightly above */
    pointer-events: none; /* Disable interaction when hidden */
    transition: opacity 0.2s ease-out, transform 0.2s ease-out;
    z-index: 10; /* Ensure it's above other content */
    background: none; /* No background */
    box-shadow: none; /* No shadow */
    border: none; /* No border */
    padding: 0;
  }

  .floating-actions.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto; /* Enable interaction when open */
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
    display: block;
  }

  .floating-actions :global(.icon-button) {
    background: none; /* No background for individual icon buttons */
    border: none;
    padding: var(--spacing-xs);
  }

  .floating-actions :global(.icon-button:hover) {
    background-color: var(--secondary-color); /* Subtle hover effect */
  }
</style>