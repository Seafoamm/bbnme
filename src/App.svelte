<script>
  import { user } from './lib/stores/userStore.js';
  import Login from './lib/components/Login.svelte';
  import Navbar from './lib/components/Navbar.svelte';
  import AddPlaceForm from './lib/components/AddPlaceForm.svelte';
  import PlacesList from './lib/components/PlacesList.svelte';
  import Card from './lib/components/Card.svelte';
  import './lib/styles/variables.css';
  import { getFunctions, httpsCallable } from 'firebase/functions';
  import { app } from './lib/firebase'; // Import app from firebase.js

  const functions = getFunctions(app);
  const checkAuthorization = httpsCallable(functions, 'checkAuthorization');

  let isAuthorizedToWrite = false;
  let authCheckComplete = false;

  // Reactively check authorization when user store changes
  $: if ($user) {
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
  } else {
    isAuthorizedToWrite = false;
    authCheckComplete = true;
  }
</script>

<main>
  {#if $user}
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
  :global(body) {
    font-family: var(--font-family);
    background-color: var(--primary-color);
    color: var(--text-color);
    margin: 0;
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
</style>