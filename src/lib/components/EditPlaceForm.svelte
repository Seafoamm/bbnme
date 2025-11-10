<script>
  import { doc, updateDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import IconButton from "./IconButton.svelte"; // Import IconButton

  export let place; // The place object to edit
  export let onSave = () => {}; // Callback after saving
  export let onCancel = () => {}; // Callback for canceling

  let name = place.name;
  let website = place.website;
  let image = place.image;

  async function updatePlace(event) {
    event.preventDefault(); // Prevent default form submission
    try {
      const placeRef = doc(db, "places", place.id);
      await updateDoc(placeRef, {
        name: name,
        website: website,
        image: image,
      });
      console.log("Document successfully updated!");
      onSave(); // Call the onSave callback
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }

  function handleCancel() {
    onCancel();
  }
</script>

<form on:submit={updatePlace}>
  <div class="header-with-actions">
    <h2>Edit Place</h2>
    <div class="actions">
      <IconButton iconSrc="./assets/save.png" altText="Save" onClick={updatePlace} size="sm" />
      <IconButton iconSrc="./assets/cancel.png" altText="Cancel" onClick={handleCancel} size="sm" />
    </div>
  </div>
  <input type="text" bind:value={name} placeholder="Place name" required />
  <input type="url" bind:value={website} placeholder="Website" />
  <input type="url" bind:value={image} placeholder="Image URL" />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  .header-with-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
  }
  .actions {
    display: flex;
    gap: var(--spacing-xs);
  }
  h2 {
    font-size: var(--font-size-lg);
    margin: 0; /* Remove default margin to align with icons */
    color: var(--text-color);
    font-weight: bold;
  }
  input {
    padding: var(--spacing-sm);
    border-radius: var(--border-radius);
    border: var(--border-width) solid var(--secondary-color);
    font-family: var(--font-family);
    font-size: var(--font-size-md);
    color: var(--text-color);
    background-color: var(--background-color);
  }
</style>
