<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  function toggleMenu() {
    dispatch('toggle');
  }
</script>

<button class="hamburger-button" on:click={toggleMenu}>
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
</button>

<style>
  .hamburger-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--spacing-sm);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: var(--spacing-lg); /* Adjust size as needed */
    height: var(--spacing-lg); /* Adjust size as needed */
    transition: var(--transition-ease);
  }

  .bar {
    width: 100%;
    height: 3px;
    background-color: var(--text-color);
    border-radius: 2px;
    transition: var(--transition-ease);
  }

  .hamburger-button:hover .bar {
    background-color: var(--accent-color);
  }
</style>
