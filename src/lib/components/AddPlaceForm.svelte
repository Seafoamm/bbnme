<script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import Button from "./Button.svelte"; // Import the Button component

  let name = "";
  let website = "";
  let image = "";

  async function addPlace() {
    try {
      const docRef = await addDoc(collection(db, "places"), {
        name: name,
        website: website,
        image: image,
      });
      console.log("Document written with ID: ", docRef.id);
      name = "";
      website = "";
      image = "";
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
</script>

<form on:submit|preventDefault={addPlace}>
  <h2>Add a new place</h2>
  <input type="text" bind:value={name} placeholder="Place name" required />
  <input type="url" bind:value={website} placeholder="Website" />
  <input type="url" bind:value={image} placeholder="Image URL" />
  <Button label="Add Place" type="submit" />
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }
  h2 {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-sm);
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