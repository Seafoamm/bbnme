<script>
  import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
  import { onMount, getContext } from "svelte";
  import { db } from "../firebase";
  import Card from "./Card.svelte";
  import SeeMoreMenu from "./SeeMoreMenu.svelte";
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
  <div class="places-grid"> <!-- New grid container -->
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
          </div>
          {#if place.image}
            <div class="image-container">
              <a href={place.website} target="_blank" rel="noreferrer" class="image-wrapper">
                <img src={place.image} alt={place.name} />
                {#if isAuthorizedToWrite}
                  <SeeMoreMenu
                    place={place}
                    isAuthorizedToWrite={isAuthorizedToWrite}
                    on:edit={e => editPlace(e.detail)}
                    on:delete={e => deletePlace(e.detail)}
                  />
                {/if}
              </a>
            </div>
          {/if}
        {/else}
      </Card>
    {/each}
  </div>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
  .places-grid { /* Styles for the grid container */
    display: grid;
    grid-template-columns: repeat(1, 1fr); /* Default to 1 column for mobile */
    gap: var(--spacing-md);
  }

  @media (min-width: 768px) { /* Tablet breakpoint */
    .places-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) { /* Desktop breakpoint */
    .places-grid {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  .place-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: var(--spacing-md);
    height: min-content;
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
  .image-container {
    text-align: center; /* Center inline-block children */
    justify-content: center;
    align-items: center;
  }
  .image-wrapper {
    position: relative; /* Make the image wrapper relative for absolute positioning of menu */
    display: inline-block; /* Ensure it only takes up the width of its content */
    line-height: 0; /* Remove extra space below image */
    width: fit-content;
  }
  img {
    max-width: 100%;
    border-radius: var(--border-radius);
  }
</style>
