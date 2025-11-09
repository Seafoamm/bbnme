<script>
  import Button from './lib/components/Button.svelte';
  import Card from './lib/components/Card.svelte';
  import './lib/styles/variables.css';
</script>

<main>
  <h1>Clean Girl Design System</h1>

  <Card>
    <h2>Buttons</h2>
    <Button label="Primary Button" />
  </Card>

  <Card>
    <h2>Card Component</h2>
    <p>This is a card component.</p>
  </Card>
</main>

<style>
  :global(body) {
    font-family: var(--font-family);
    background-color: var(--primary-color);
    color: var(--text-color);
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
</style>
