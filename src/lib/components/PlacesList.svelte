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
  let hoveredPlaceId = null; // State to track hovered image

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

  function handleMouseEnter(id) {
    hoveredPlaceId = id;
  }

  function handleMouseLeave() {
    hoveredPlaceId = null;
  }
</script>

<div class="places-list-container">
  <h2>Travel Wishlist</h2>
  <div class="places-grid">
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
              <a
                href={place.website}
                target="_blank"
                rel="noreferrer"
                class="image-wrapper"
                on:mouseenter={() => handleMouseEnter(place.id)}
                on:mouseleave={handleMouseLeave}
              >
                <img src={place.image} alt={place.name} />
                {#if isAuthorizedToWrite}
                  <SeeMoreMenu
                    place={place}
                    isAuthorizedToWrite={isAuthorizedToWrite}
                    isHovered={hoveredPlaceId === place.id} <!-- Pass isHovered prop -->
                  />
                {/if}
              </a>
            </div>
          {/if}
        {/if}
      </Card>
    {/each}
  </div>
</div>

<style>
  .places-list-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    flex-grow: 1;
  }
  .places-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr); /* Default to 1 column for mobile */
    gap: var(--spacing-md);
    margin: 5px;
  }

  @media (min-width: 768px) {
    .places-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (min-width: 1200px) {
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
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  .image-wrapper {
    position: relative;
    display: inline-block;
    line-height: 0;
    width: fit-content;
  }
  img {
    max-width: 100%;
    border-radius: var(--border-radius);
  }
</style>
