<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let iconSrc;
  export let altText = 'Icon Button';
  export let onClick = () => {};
  export let size = 'md'; // 'sm', 'md', 'lg' for different sizes

  let buttonSize;
  $: {
    switch (size) {
      case 'sm':
        buttonSize = 'var(--spacing-lg)'; // e.g., 30px
        break;
      case 'lg':
        buttonSize = 'var(--spacing-xl)'; // e.g., 40px
        break;
      case 'md':
      default:
        buttonSize = '33px'; // Default to current See More icon size
        break;
    }
  }

  function handleClick(event) {
    event.stopPropagation(); // Stop event from bubbling up
    onClick(event);
  }
</script>

<button class="icon-button" on:click={handleClick}>
  <img src={iconSrc} alt={altText} style="width: {buttonSize}; height: {buttonSize};" />
</button>

<style>
  .icon-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-xs);
    transition: var(--transition-ease);
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-button img {
    display: block;
    object-fit: contain;
  }
</style>