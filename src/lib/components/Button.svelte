<script>
  export let label = 'Button';
  export let onClick = () => {};
</script>

<button on:click={onClick}>
  {label}
</button>

<style>
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
