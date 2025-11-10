<script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";
  import IconButton from "./IconButton.svelte"; // Import IconButton

  let name = "";
  let website = "";
  let image = "";

  async function addPlace(event) {
    event.preventDefault(); // Prevent default form submission
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

<form on:submit={addPlace}>
  <div class="header-with-action">
    <h2>Add a new place</h2>
    <IconButton iconSrc="./assets/save.png" altText="Save Place" onClick={addPlace} size="sm" />
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
  .header-with-action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    margin-right: auto;
  }
  h2 {
    font-size: var(--font-size-lg);
    margin: 0; /* Remove default margin to align with icon */
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