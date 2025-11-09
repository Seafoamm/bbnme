<script>
  import AddPlaceForm from './lib/components/AddPlaceForm.svelte';
  import PlacesList from './lib/components/PlacesList.svelte';
  import Card from './lib/components/Card.svelte';
  import './lib/styles/variables.css';
</script>

<main>
  <h1>Clean Girl Travel Wishlist</h1>

  <Card>
    <AddPlaceForm />
  </Card>

  <PlacesList />

</main>

<style>
  :global(body) {
    font-family: var(--font-family);
    background-color: var(--primary-color);
    color: var(--text-color);
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
</style>