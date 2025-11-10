<div class="card">
  <slot></slot>
</div>

<style>
  .card {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: var(--spacing-md);
    padding-top: 0%;
    box-shadow: var(--box-shadow-md);
    border: var(--border-width) solid var(--secondary-color);
    justify-content: center;
    align-items: center;
  }
</style>