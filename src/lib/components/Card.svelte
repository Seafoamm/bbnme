<div class="card">
  <slot></slot>
</div>

<style>
  .card {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--secondary-color);
  }
</style>
