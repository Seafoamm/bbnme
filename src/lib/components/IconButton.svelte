<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let iconSrc;
  export let altText = 'Icon Button';
  export let onClick = () => {};
  export let size = 'md'; // 'sm', 'md', 'lg', 'xl' for different sizes
  export let isSpinning = false; // New prop for spinning animation
  export let isInteractive = true; // New prop for interactivity
  export let hoverEffect = true; // New prop to control hover effect

  let buttonSize;
  $: {
    switch (size) {
      case 'sm':
        buttonSize = 'var(--spacing-lg)'; // e.g., 30px
        break;
      case 'md':
        buttonSize = '33px'; // Default to current See More icon size
        break;
      case 'lg':
        buttonSize = 'var(--spacing-xl)'; // e.g., 40px
        break;
      case 'xl':
        buttonSize = '60px'; // Larger size for spinner
        break;
      default:
        buttonSize = '33px';
        break;
    }
  }

  function handleClick(event) {
    if (isInteractive) {
      event.stopPropagation(); // Stop event from bubbling up
      onClick(event);
    }
  }
</script>

<button class="icon-button" class:interactive={isInteractive} class:hover-effect={hoverEffect} on:click={handleClick}>
  <img src={iconSrc} alt={altText} style="width: {buttonSize}; height: {buttonSize};" class:spinning={isSpinning} />
</button>

<style>
  .icon-button {
    background: none;
    border: none;
    padding: var(--spacing-xs);
    transition: all 0.2s ease; /* Adjusted transition for border and shadow */
    border-radius: var(--border-radius);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-button.interactive {
    cursor: pointer;
  }

  .icon-button.hover-effect:hover {
    border: 2px solid var(--accent-color); /* Outline effect */
    box-shadow: 0 0 8px var(--accent-color); /* Glow effect */
    /* Removed transform: translateY(-5px) scale(1.1); */
  }

  .icon-button img {
    display: block;
    object-fit: contain;
  }

  .spinning {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
