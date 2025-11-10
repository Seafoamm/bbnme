<script>
  import { user, authLoading } from './lib/stores/userStore.js';
  import Login from './lib/components/Login.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import SideNav from './lib/components/SideNav.svelte';
  import AddPlaceForm from './lib/components/AddPlaceForm.svelte';
  import PlacesList from './lib/components/PlacesList.svelte';
  import Card from './lib/components/Card.svelte';
  import Tabs from './lib/components/Tabs.svelte';
  import TabPanel from './lib/components/TabPanel.svelte';
  import IconButton from './lib/components/IconButton.svelte';
  import './lib/styles/variables.css';
  import { getFunctions, httpsCallable } from 'firebase/functions';
  import { app } from './lib/firebase';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition'; // Import fade transition

  const functions = getFunctions(app);
  const checkAuthorization = httpsCallable(functions, 'checkAuthorization');

  const isAuthorizedToWriteStore = writable(false);
  let authCheckComplete = false;
  let isSideNavOpen = false;
  let showLoadingScreen = true;
  let fadeOutComplete = false;

  setContext('isAuthorizedToWrite', isAuthorizedToWriteStore);

  $: loadingFinished = !$authLoading && authCheckComplete;

  $: if (loadingFinished && !fadeOutComplete) {
    setTimeout(() => {
      showLoadingScreen = false;
      fadeOutComplete = true;
    }, 500); // Match this duration to the CSS transition duration
  }

  async function performAuthorizationCheck() {
    try {
      const result = await checkAuthorization();
      isAuthorizedToWriteStore.set(result.data.status === 'authorized');
    } catch (error) {
      console.error("Error checking authorization:", error);
      isAuthorizedToWriteStore.set(false);
    } finally {
      authCheckComplete = true;
    }
  }

  $: if (!$authLoading && $user) {
    performAuthorizationCheck();
  } else if (!$authLoading && !$user) {
    isAuthorizedToWriteStore.set(false);
    authCheckComplete = true;
  } else {
    isAuthorizedToWriteStore.set(false);
    authCheckComplete = false;
  }

  function toggleSideNav() {
    isSideNavOpen = !isSideNavOpen;
  }
</script>

<main>
  <!-- Main content, always rendered but its visibility controlled -->
  <div class="main-content-wrapper" class:visible={!showLoadingScreen}>
    {#if $user}
      <Navbar on:toggle={toggleSideNav} />
      <SideNav isOpen={isSideNavOpen} on:close={toggleSideNav} />
      <div class="container">
        <Tabs>
          {#if authCheckComplete && $isAuthorizedToWriteStore}
            <TabPanel title="Add Place">
              <Card>
                <AddPlaceForm />
              </Card>
            </TabPanel>
          {/if}
          <TabPanel title="Travel Wishlist">
            <PlacesList />
          </TabPanel>
        </Tabs>
      </div>
    {:else}
      <Login />
    {/if}
  </div>

  <!-- Loading screen, rendered on top -->
  {#if showLoadingScreen}
    <div class="loading-screen" class:fade-out={loadingFinished}>
      <IconButton iconSrc="./assets/spinner.png" altText="Loading Spinner" size="xl" isSpinning={true} isInteractive={false} />
    </div>
  {/if}
</main>

<style>
  :global(html),
  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    /* Removed overflow: hidden; */
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
    position: relative; /* For positioning main-content-wrapper */
  }

  .main-content-wrapper {
    position: absolute; /* Position over the main content */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Start hidden */
    pointer-events: none; /* Not interactive when hidden */
    transition: opacity 0.5s ease-in; /* Fade in transition */
    display: flex; /* Ensure it takes up space for its children */
    flex-direction: column;
  }

  .main-content-wrapper.visible {
    opacity: 1; /* Fade in when visible */
    pointer-events: auto; /* Enable interaction */
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    padding: var(--spacing-md);
    /* Removed max-width: 800px; */
    /* Removed margin: 0 auto; */
    flex-grow: 1; /* Allow container to grow and push footer down if needed */
  }

  h1 {
    font-size: var(--font-size-xl);
    text-align: center;
    margin-bottom: var(--spacing-md);
  }

  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-color);
    color: var(--text-color);
    font-family: var(--font-family);
    z-index: 9999;
    opacity: 1; /* Ensure it starts fully opaque */
    transition: opacity 0.5s ease-out; /* Fade out transition */
  }

  .loading-screen.fade-out {
    opacity: 0;
    pointer-events: none; /* Disable interaction after fade out */
  }

  .spinner-icon {
    animation: spin 1s linear infinite; /* Spinning animation */
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-image {
    width: 100vw; /* Fill viewport width */
    height: 100vh; /* Fill viewport height */
    object-fit: scale-down; /* THIS SHOULD NOT BE TOUCHED WITHOUT EXPLICIT PERMISSION */
    object-position: center; /* Center the image within its content box */
  }
</style>
