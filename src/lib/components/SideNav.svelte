<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase";
  import { user } from "../stores/userStore";
  import Button from "./Button.svelte";
  import { createEventDispatcher } from 'svelte';

  export let isOpen = false;
  export let isAuthorizedToWrite;

  const dispatch = createEventDispatcher();

  function closeNav() {
    dispatch('close');
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
    <div class="nav-links">
      <!-- Add your navigation links here -->
      <a href="/">Home</a>
      <!-- Example: <a href="/settings">Settings</a> -->
    </div>
    <div class="sidenav-footer">
      <Button label="Sign out" onClick={() => signOut(auth)} />
    </div>
  {/if}
</div>

<style>
  .sidenav {
    height: 100%;
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

  .nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    flex-grow: 1;
  }

  .nav-links a {
    padding: var(--spacing-sm);
    text-decoration: none;
    font-size: var(--font-size-lg);
    color: var(--text-color);
    display: block;
    transition: var(--transition-ease);
    border-radius: var(--border-radius);
  }

  .nav-links a:hover {
    background-color: var(--secondary-color);
    color: var(--accent-color);
  }

  .sidenav-footer {
    padding: var(--spacing-md) 0;
    border-top: var(--border-width) solid var(--secondary-color);
    margin-top: var(--spacing-md);
    text-align: center;
  }
</style>
