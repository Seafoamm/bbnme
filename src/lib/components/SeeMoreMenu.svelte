<script>
  import { createEventDispatcher } from 'svelte';
  import IconButton from './IconButton.svelte';
  import { getContext } from 'svelte'; // Import getContext
  import { get } from 'svelte/store'; // Import get for initial value

  export let place; // The place object for context
  export let isHovered = false; // Re-added export let isHovered

  const dispatch = createEventDispatcher();
  let isOpen = false;

  // Retrieve isAuthorizedToWrite store from context
  const isAuthorizedToWriteStore = getContext('isAuthorizedToWrite');
  // Use auto-subscription for reactivity
  $: isAuthorizedToWrite = $isAuthorizedToWriteStore;

  function toggleMenu(event) {
    event.preventDefault(); // Prevent default action (e.g., anchor tag click)
    event.stopPropagation(); // Prevent click from closing immediately
    isOpen = !isOpen;
  }

  function handleEdit(event) {
    event.preventDefault(); // Prevent default action (e.g., anchor tag click)
    dispatch('edit', place);
    isOpen = false;
  }

  function handleDelete(event) {
    event.preventDefault(); // Prevent default action (e.g., anchor tag click)
    dispatch('delete', place.id);
    isOpen = false;
  }

  // Close menu when clicking outside
  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.see-more-menu')) {
      isOpen = false;
    }
  }

  // Close menu if not hovered anymore
  $: if (!isHovered && isOpen) {
    isOpen = false;
  }
</script>

<svelte:window on:click={handleClickOutside} />

<div class="see-more-menu" class:visible={isHovered}>
  <IconButton
    iconSrc="./assets/see_more.png"
    altText="See More Options"
    onClick={toggleMenu}
    size="md"
    class="see-more-icon-button"
  />

  {#if isOpen && isAuthorizedToWrite}
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
    opacity: 0; /* Hidden by default */
    transition: opacity 0.2s ease-out; /* Smooth transition */
    pointer-events: none; /* Disable interaction when hidden */
  }

  .see-more-menu.visible {
    opacity: 1; /* Visible when hovered */
    pointer-events: auto; /* Enable interaction when visible */
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

  /* Specific hover for the main See More icon button */
  .see-more-icon-button :global(button:hover) {
    background-color: var(--secondary-color);
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