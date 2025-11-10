<div class="card">
  <slot></slot>
</div>

<style>
  .card {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    box-shadow: var(--box-shadow-md);
    border: var(--border-width) solid var(--secondary-color);
  }
</style>