<script>
  import { user, authLoading } from './lib/stores/userStore.js';
  import Login from './lib/components/Login.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import SideNav from './lib/components/SideNav.svelte';
  import AddPlaceForm from './lib/components/AddPlaceForm.svelte';
  import PlacesList from './lib/components/PlacesList.svelte';
  import Card from './lib/components/Card.svelte';
  import './lib/styles/variables.css';
  import { getFunctions, httpsCallable } from 'firebase/functions';
  import { app } from './lib/firebase';
  // Removed onMount import as setTimeout is no longer needed

  const functions = getFunctions(app);
  const checkAuthorization = httpsCallable(functions, 'checkAuthorization');
  // Removed MIN_LOADING_TIME constant

  let isAuthorizedToWrite = false;
  let authCheckComplete = false;
  // Removed minLoadTimeElapsed variable

  // Removed onMount block

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

  function toggleSideNav() {
    isSideNavOpen = !isSideNavOpen;
  }
</script>

<main class:fullscreen-main={($authLoading || !authCheckComplete)}> <!-- Adjusted condition -->
  {#if ($authLoading || !authCheckComplete)} <!-- Adjusted condition -->
    <div class="loading-screen">
      <img src="./assets/loading_image.png" alt="Loading..." class="loading-image" />
    </div>
  {:else if $user}
    <Navbar on:toggle={toggleSideNav} />
    <SideNav isOpen={isSideNavOpen} on:close={toggleSideNav} />
    <div class="container">
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
    /* Removed position: relative; */
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
    position: fixed; /* Position relative to the viewport */
    top: 0;
    left: 0;
    width: 100vw; /* Take full viewport width */
    height: 100vh; /* Take full viewport height */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-color); /* Changed to primary-color for a softer look */
    color: var(--text-color);
    font-family: var(--font-family);
    z-index: 9999; /* Ensure it's on top of other content */
  }

  .loading-image {
    width: 100vw; /* Fill viewport width */
    height: 100vh; /* Fill viewport height */
    object-fit: scale-down; /* THIS SHOULD NOT BE TOUCHED WITHOUT EXPLICIT PERMISSION */
    object-position: center; /* Center the image within its content box */
  }
</style>
