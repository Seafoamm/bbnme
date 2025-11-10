<script>
  import { signInWithPopup } from "firebase/auth";
  import { auth, googleProvider } from "../firebase";
  import Button from "./Button.svelte";
</script>

<div class="login-container">
  <h2>Please sign in to continue</h2>
  <Button
    label="Sign in with Google"
    onClick={() => signInWithPopup(auth, googleProvider)}
  />
</div>

<style>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: var(--spacing-md);
    background-color: var(--primary-color);
    color: var(--text-color);
    font-family: var(--font-family);
  }
  h2 {
    font-size: var(--font-size-lg);
    color: var(--text-color);
    font-weight: bold;
  }
</style>