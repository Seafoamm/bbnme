<script>
  import HamburgerMenu from "./HamburgerMenu.svelte";
  import { createEventDispatcher, getContext } from 'svelte'; // Import getContext
  import { user } from "../stores/userStore"; // Import user store

  const dispatch = createEventDispatcher();

  // Retrieve isAuthorizedToWrite from context
  const { get: getIsAuthorizedToWrite } = getContext('isAuthorizedToWrite');
  $: isAuthorizedToWrite = getIsAuthorizedToWrite(); // Reactive declaration

  function handleToggle() {
    dispatch('toggle');
  }
</script>

<nav>
  <HamburgerMenu on:toggle={handleToggle} />
  <div class="navbar-title">
    <h1>bb'n'me</h1>
  </div>
  <div class="user-status">
    {#if $user && !isAuthorizedToWrite}
      <span class="not-authorized-message">Unauthorized user</span>
    {/if}
  </div>
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
  .user-status {
    width: var(--spacing-lg); /* Match hamburger button width for centering */
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .not-authorized-message {
    font-size: var(--font-size-sm);
    color: var(--error-color);
    white-space: nowrap; /* Prevent text from wrapping */
  }
</style>
