<script>
  import { createEventDispatcher } from 'svelte';
  import IconButton from './IconButton.svelte';
  import { getContext } from 'svelte';
  import { get } from 'svelte/store';

  export let place;
  export let isHovered = false;

  const dispatch = createEventDispatcher();
  let isOpen = false;

  const isAuthorizedToWriteStore = getContext('isAuthorizedToWrite');
  $: isAuthorizedToWrite = $isAuthorizedToWriteStore;

  function toggleMenu(event) {
    event.preventDefault();
    event.stopPropagation();
    isOpen = !isOpen;
  }

  function handleEdit(event) {
    event.preventDefault();
    dispatch('edit', place);
    isOpen = false;
  }

  function handleDelete(event) {
    event.preventDefault();
    dispatch('delete', place.id);
    isOpen = false;
  }

  function handleClickOutside(event) {
    if (isOpen && !event.target.closest('.see-more-menu')) {
      isOpen = false;
    }
  }

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
    top: calc(100% + var(--spacing-xs)); /* Position below the see-more button with a small gap */
    right: 0;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    opacity: 0;
    transform: translateY(-5px); /* Start slightly above for a subtle drop */
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

  /* Removed specific hover for the main See More icon button */
  /* .see-more-icon-button :global(button:hover) {
    background-color: var(--secondary-color);
  } */

  .floating-actions :global(.icon-button) {
    background: none; /* No background for individual icon buttons */
    border: none;
    padding: var(--spacing-xs);
  }

  /* Removed specific hover for floating icon buttons */
  /* .floating-actions :global(.icon-button:hover) {
    background-color: var(--secondary-color);
  } */
</style>
