<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase";
  import { user } from "../stores/userStore";
  import IconButton from "./IconButton.svelte"; // Use IconButton
  import { createEventDispatcher, getContext } from 'svelte';
  import { get } from 'svelte/store';

  export let isOpen = false;

  const dispatch = createEventDispatcher();

  const isAuthorizedToWriteStore = getContext('isAuthorizedToWrite');
  $: isAuthorizedToWrite = $isAuthorizedToWriteStore;

  function closeNav() {
    dispatch('close');
  }

  function handleSignOut() {
    signOut(auth);
    closeNav(); // Close nav after signing out
  }
</script>

<div class="sidenav" class:open={isOpen}>
  <button class="close-button" on:click={closeNav}>&times;</button>
  {#if $user}
    <div class="user-profile">
      <img src={$user.photoURL} alt="Profile" />
      <span>{$user.displayName}</span>
      {#if !isAuthorizedToWrite}
        <span class="not-authorized-message">Unauthorized user</span>
      {/if}
    </div>
    <div class="nav-links-wrapper">
      <div class="nav-links">
        <!-- Home Icon Button -->
        <IconButton iconSrc="./assets/home.png" altText="Home" onClick={closeNav} size="md" />
        <!-- Example: <a href="/settings">Settings</a> -->
      </div>
    </div>
    <div class="sidenav-footer">
      <IconButton iconSrc="./assets/log_out.png" altText="Sign Out" onClick={handleSignOut} size="md" />
    </div>
  {/if}
</div>

<style>
  .sidenav {
    height: 90vh;
    width: 0;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    background-color: var(--primary-color);
    overflow-x: hidden;
    transition: var(--transition-ease);
    padding-top: var(--spacing-lg);
    box-shadow: var(--box-shadow-md);
    display: flex;
    flex-direction: column;
    color: var(--text-color);
  }

  .sidenav.open {
    width: 250px; /* Adjust width as needed */
    padding-left: var(--spacing-md);
    padding-right: var(--spacing-md);
  }

  .close-button {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-md);
    font-size: var(--font-size-xl);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
    transition: var(--transition-ease);
  }

  .close-button:hover {
    color: var(--accent-color);
  }

  .user-profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-md) 0;
    border-bottom: var(--border-width) solid var(--secondary-color);
    margin-bottom: var(--spacing-md);
    flex-shrink: 0;
  }

  .user-profile img {
    width: var(--spacing-xl);
    height: var(--spacing-xl);
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: var(--spacing-sm);
  }

  .user-profile span {
    font-size: var(--font-size-md);
    margin-bottom: var(--spacing-xs);
  }

  .not-authorized-message {
    font-size: var(--font-size-sm);
    color: var(--error-color);
  }

  .nav-links-wrapper {
    flex-grow: 1;
    overflow-y: auto;
    padding-bottom: var(--spacing-md);
  }

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .nav-links :global(.icon-button) { /* Target IconButton within nav-links */
    justify-content: flex-start; /* Align icon and text to start */
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
  }

  .nav-links :global(.icon-button img) {
    width: var(--font-size-lg); /* Adjust icon size */
    height: var(--font-size-lg);
    margin-right: var(--spacing-sm);
  }

  .nav-links :global(.icon-button:hover) {
    background-color: var(--secondary-color);
  }

  .sidenav-footer {
    padding: var(--spacing-md) 0;
    border-top: var(--border-width) solid var(--secondary-color);
    margin-top: auto;
    text-align: center;
    flex-shrink: 0;
  }

  .sidenav-footer :global(.icon-button) {
    width: 100%;
    justify-content: center;
  }

  .sidenav-footer :global(.icon-button img) {
    width: var(--font-size-lg);
    height: var(--font-size-lg);
  }
</style>