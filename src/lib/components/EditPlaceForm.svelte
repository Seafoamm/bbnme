<script>
  import { doc, updateDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import Button from "./Button.svelte";

  export let place; // The place object to edit
  export let onSave = () => {}; // Callback after saving
  export let onCancel = () => {}; // Callback for canceling

  let name = place.name;
  let website = place.website;
  let image = place.image;

  async function updatePlace() {
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
</script>

<form on:submit|preventDefault={updatePlace}>
  <h2>Edit Place</h2>
  <input type="text" bind:value={name} placeholder="Place name" required />
  <input type="url" bind:value={website} placeholder="Website" />
  <input type="url" bind:value={image} placeholder="Image URL" />
  <div class="actions">
    <Button label="Save" type="submit" />
    <Button label="Cancel" onClick={onCancel} />
  </div>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  input {
    padding: 10px;
    border-radius: var(--border-radius);
    border: 1px solid var(--secondary-color);
    font-family: var(--font-family);
  }
  .actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
</style>
