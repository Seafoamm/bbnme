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
        <span class="not-authorized-message">Not authorized to write</span>
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
    padding: 10px 20px;
    background-color: var(--secondary-color);
    color: var(--text-color);
    border-bottom: 1px solid var(--accent-color);
  }
  .user-section {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  .not-authorized-message {
    font-size: 0.8em;
    color: #cc0000; /* A subtle red for warning */
  }
</style>