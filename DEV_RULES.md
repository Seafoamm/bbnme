# Development Rules and Conventions

## Avoiding Prop Drilling with Svelte Context API

To maintain a clean and manageable component hierarchy, especially in larger applications, we prefer using Svelte's [Context API](https://svelte.dev/docs/svelte-context) instead of prop drilling for passing data down through multiple levels of nested components.

**When to use Context API:**
*   When data needs to be accessed by many components at different nesting levels.
*   When data is global or semi-global to a specific section of the application.
*   To avoid passing the same prop through many intermediate components that don't directly use it.

**How to use Context API:**
1.  **`setContext(key, value)`:** Use `setContext` in a parent component (or a component higher up the tree) to provide a value.
2.  **`getContext(key)`:** Use `getContext` in any descendant component to retrieve that value.

This approach helps decouple components and makes the data flow more explicit and easier to reason about.
