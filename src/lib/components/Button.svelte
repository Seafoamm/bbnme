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
    border: var(--border-width) solid var(--accent-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-sm) var(--spacing-md);
    cursor: pointer;
    transition: var(--transition-ease);
    font-size: var(--font-size-md);
  }

  button:hover {
    background-color: var(--secondary-color);
  }
</style>