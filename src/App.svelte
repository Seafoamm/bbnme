<script>
  import { user, authLoading } from './lib/stores/userStore.js';
  import Login from './lib/components/Login.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import AddPlaceForm from './lib/components/AddPlaceForm.svelte';
  import PlacesList from './lib/components/PlacesList.svelte';
  import Card from './lib/components/Card.svelte';
  import './lib/styles/variables.css';
  import { getFunctions, httpsCallable } from 'firebase/functions';
  import { app } from './lib/firebase';
  import { onMount } from 'svelte';

  const functions = getFunctions(app);
  const checkAuthorization = httpsCallable(functions, 'checkAuthorization');

  let isAuthorizedToWrite = false;
  let authCheckComplete = false;
  let minLoadTimeElapsed = false;

  onMount(() => {
    setTimeout(() => {
      minLoadTimeElapsed = true;
    }, 1000); // Ensure loading screen displays for at least 1 second
  });

  // Reactively check authorization when user store changes
  $: if (!$authLoading && $user) {
    checkAuthorization()
      .then((result) => {
        isAuthorizedToWrite = result.data.status === 'authorized';
        authCheckComplete = true;
      })
      .catch((error) => {
        console.error("Error checking authorization:", error);
        isAuthorizedToWrite = false;
        authCheckComplete = true;
      });
  } else if (!$authLoading && !$user) {
    isAuthorizedToWrite = false;
    authCheckComplete = true;
  } else {
    isAuthorizedToWrite = false;
    authCheckComplete = false;
  }
</script>

<main class:fullscreen-main={($authLoading || !minLoadTimeElapsed)}>
  {#if ($authLoading || !minLoadTimeElapsed)}
    <div class="loading-screen">
      <img src="./assets/loading_image.png" alt="Loading..." class="loading-image" />
    </div>
  {:else if $user}
    <Navbar {isAuthorizedToWrite} />
    <div class="container">
      <h1>Clean Girl Travel Wishlist</h1>
      {#if authCheckComplete}
        {#if isAuthorizedToWrite}
          <Card>
            <AddPlaceForm />
          </Card>
        {/if}
      {:else}
        <Card>
          <p>Checking authorization...</p>
        </Card>
      {/if}
      <PlacesList {isAuthorizedToWrite} />
    </div>
  {:else}
    <Login />
  {/if}
</main>

<style>
  :global(html),
  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; /* Prevent scrollbars during loading */
  }

  :global(body) {
    font-family: var(--font-family);
    background-color: var(--primary-color);
    color: var(--text-color);
  }

  main {
    display: flex;
    flex-direction: column;
    min-height: 100%; /* Ensure main takes at least full height */
  }

  .fullscreen-main {
    height: 100%; /* When loading, main should take full height */
    justify-content: center; /* Center content vertically */
    align-items: center; /* Center content horizontally */
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    max-width: 800px;
    margin: 0 auto;
    flex-grow: 1; /* Allow container to grow and push footer down if needed */
  }

  h1 {
    font-size: var(--font-size-xl);
    text-align: center;
    margin-bottom: var(--spacing-md);
  }

  .loading-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; /* Take full width */
    height: 100%; /* Take full height of its parent (main) */
    background-color: var(--primary-color);
    color: var(--text-color);
    font-family: var(--font-family);
    gap: var(--spacing-md);
  }

  .loading-image {
    max-width: 150px; /* Adjusted for consistency */
    height: auto;
  }
</style>
