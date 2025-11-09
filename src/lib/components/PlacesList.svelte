<script>
  import { collection, onSnapshot } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../firebase";
  import Card from "./Card.svelte";

  let places = [];

  onMount(() => {
    const unsubscribe = onSnapshot(collection(db, "places"), (snapshot) => {
      places = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return () => unsubscribe();
  });
</script>

<div>
  <h2>Travel Wishlist</h2>
  {#each places as place}
    <Card>
      <h3>{place.name}</h3>
      {#if place.website}
        <a href={place.website} target="_blank" rel="noreferrer">Website</a>
      {/if}
      {#if place.image}
        <img src={place.image} alt={place.name} />
      {/if}
    </Card>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  img {
    max-width: 100%;
    border-radius: var(--border-radius);
  }
</style>
