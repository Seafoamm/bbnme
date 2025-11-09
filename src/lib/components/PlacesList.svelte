<script>
  import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../firebase";
  import Card from "./Card.svelte";
  import Button from "./Button.svelte";
  import EditPlaceForm from "./EditPlaceForm.svelte";

  export let isAuthorizedToWrite; // Prop to receive authorization status

  let places = [];
  let editingPlace = null;

  onMount(() => {
    const unsubscribe = onSnapshot(collection(db, "places"), (snapshot) => {
      places = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    });

    return () => unsubscribe();
  });

  async function deletePlace(id) {
    try {
      await deleteDoc(doc(db, "places", id));
      console.log("Document successfully deleted!");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  }

  function editPlace(place) {
    editingPlace = place;
  }

  function handleEditSave() {
    editingPlace = null;
  }

  function handleEditCancel() {
    editingPlace = null;
  }
</script>

<div>
  <h2>Travel Wishlist</h2>
  {#each places as place}
    <Card>
      {#if editingPlace && editingPlace.id === place.id}
        <EditPlaceForm
          place={editingPlace}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      {:else}
        <h3>{place.name}</h3>
        {#if place.website}
          <a href={place.website} target="_blank" rel="noreferrer">Website</a>
        {/if}
        {#if place.image}
          <a href={place.website} target="_blank" rel="noreferrer">
            <img src={place.image} alt={place.name} />
          </a>
        {/if}
        {#if isAuthorizedToWrite}
          <div class="actions">
            <Button label="Edit" onClick={() => editPlace(place)} />
            <Button label="Delete" onClick={() => deletePlace(place.id)} />
          </div>
        {/if}
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
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
</style>