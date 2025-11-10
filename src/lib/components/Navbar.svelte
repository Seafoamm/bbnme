<script>
  import HamburgerMenu from "./HamburgerMenu.svelte";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function handleToggle() {
    dispatch('toggle');
  }
</script>

<nav>
  <HamburgerMenu on:toggle={handleToggle} />
  <div class="navbar-title">
    <h1>bb'n'me</h1>
  </div>
  <div class="placeholder"></div> <!-- To balance the flex layout -->
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm) var(--spacing-md);
    background-color: var(--secondary-color);
    color: var(--text-color);
    border-bottom: var(--border-width) solid var(--accent-color);
    position: sticky;
    top: 0;
    z-index: 999;
  }
  .navbar-title {
    flex-grow: 1;
    text-align: center;
  }
  .navbar-title h1 {
    font-size: var(--font-size-lg);
    margin: 0;
    color: var(--text-color);
  }
  .placeholder {
    width: var(--spacing-lg); /* Match hamburger button width for centering */
    height: var(--spacing-lg);
  }
</style>