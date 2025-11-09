<script>
  import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../firebase";
  import Card from "./Card.svelte";
  import Button from "./Button.svelte";
  import EditPlaceForm from "./EditPlaceForm.svelte"; // Import the EditPlaceForm component

  let places = [];
  let editingPlace = null; // State to hold the place being edited

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
    editingPlace = place; // Set the place to be edited
  }

  function handleEditSave() {
    editingPlace = null; // Clear editing state after save
  }

  function handleEditCancel() {
    editingPlace = null; // Clear editing state if canceled
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
          <img src={place.image} alt={place.name} />
        {/if}
        <div class="actions">
          <Button label="Edit" onClick={() => editPlace(place)} />
          <Button label="Delete" onClick={() => deletePlace(place.id)} />
        </div>
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
