<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase";
  import { user } from "../stores/userStore";
  import Button from "./Button.svelte";

  export let isAuthorizedToWrite;
</script>

<nav>
  {#if $user}
    <div class="user-section">
      <div class="user-info">
        <img src={$user.photoURL} alt="Profile" />
        <span>{$user.displayName}</span>
      </div>
      {#if !isAuthorizedToWrite}
        <span class="not-authorized-message">Unauthorized user</span>
      {/if}
    </div>
    <Button label="Sign out" onClick={() => signOut(auth)} />
  {/if}
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
  }
  .user-section {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  img {
    width: var(--spacing-xl);
    height: var(--spacing-xl);
    border-radius: 50%;
    object-fit: cover;
  }
  .not-authorized-message {
    font-size: var(--font-size-sm);
    color: var(--error-color);
  }
</style>
