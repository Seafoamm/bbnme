<script>
  import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
  import { onMount, getContext } from "svelte";
  import { db } from "../firebase";
  import Card from "./Card.svelte";
  import SeeMoreMenu from "./SeeMoreMenu.svelte"; // Import SeeMoreMenu
  import EditPlaceForm from "./EditPlaceForm.svelte";

  const isAuthorizedToWriteStore = getContext('isAuthorizedToWrite');
  $: isAuthorizedToWrite = $isAuthorizedToWriteStore;

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
        <div class="place-header">
          <h3><b>{place.name}</b></h3>
          {#if isAuthorizedToWrite}
            <SeeMoreMenu
              place={place}
              isAuthorizedToWrite={isAuthorizedToWrite}
              on:edit={e => editPlace(e.detail)}
              on:delete={e => deletePlace(e.detail)}
            />
          {/if}
        </div>
        {#if place.image}
          <a href={place.website} target="_blank" rel="noreferrer">
            <img src={place.image} alt={place.name} />
          </a>
        {/if}
      {/if}
    </Card>
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  .place-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h2 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-sm);
    color: var(--text-color);
    font-weight: bold;
  }
  h3 {
    font-size: var(--font-size-md);
    color: var(--text-color);
    margin-bottom: var(--spacing-xs);
    font-weight: bold;
  }
  img {
    max-width: 100%;
    border-radius: var(--border-radius);
    margin-top: var(--spacing-sm);
  }
</style>