<script>
  import { signOut } from "firebase/auth";
  import { auth } from "../firebase";
  import { user } from "../stores/userStore";
  import Button from "./Button.svelte";
</script>

<nav>
  {#if $user}
    <div class="user-info">
      <img src={$user.photoURL} alt="Profile" />
      <span>{$user.displayName}</span>
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
  }
</style>
