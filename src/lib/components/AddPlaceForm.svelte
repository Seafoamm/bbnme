<script>
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase";

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
  <button type="submit">Add Place</button>
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
  button {
    font-family: var(--font-family);
    background-color: var(--primary-color);
    color: var(--text-color);
    border: 1px solid var(--accent-color);
    border-radius: var(--border-radius);
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  button:hover {
    background-color: var(--secondary-color);
  }
</style>
