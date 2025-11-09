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

## Don't Repeat Yourself (DRY) Principle

Strive to eliminate repetition of code, configuration, and knowledge. Every piece of knowledge must have a single, unambiguous, authoritative representation within the system.

**Practices:**
*   **Abstract common logic:** Extract reusable functions, components, or modules.
*   **Use variables and constants:** Define values once and reuse them.
*   **Leverage Svelte's reactivity:** Use stores and reactive declarations effectively to avoid manual DOM manipulation.

## Simplify Design and Implementation

Always aim for the simplest possible solution that meets the requirements. Complexity is the enemy of maintainability, readability, and reliability.

**Practices:**
*   **Start small:** Implement the core functionality first, then iterate.
*   **Refactor regularly:** Improve code structure and remove unnecessary complexity.
*   **Question assumptions:** Challenge existing solutions and look for simpler alternatives.
*   **Prioritize clarity:** Code should be easy to understand for anyone reading it.

## Web Security Best Practices

Security is paramount, especially for web applications. Always consider potential vulnerabilities and implement best practices to protect user data and application integrity.

**Practices:**
*   **Never expose sensitive data client-side:** Avoid hardcoding API keys, secrets, or personal identifiable information (PII) directly in client-side code or public source repositories. Use environment variables, server-side secrets (like Firebase Secret Manager), or secure backend calls.
*   **Validate all input:** Always validate and sanitize user input on both the client and server sides to prevent injection attacks (e.g., XSS, SQL Injection).
*   **Implement proper authentication and authorization:** Ensure users are who they say they are (authentication) and that they only have access to resources they are permitted to use (authorization), as demonstrated with Firebase Authentication and Firestore Security Rules.
*   **Use HTTPS:** Always serve your application over HTTPS to encrypt data in transit.
*   **Keep dependencies updated:** Regularly update libraries and frameworks to patch known security vulnerabilities.

## Codebase Hygiene (Unused Files & Dead Code)

A clean codebase is easier to maintain, understand, and debug. Regularly remove unnecessary elements.

**Practices:**
*   **Scan for unused files/folders:** Periodically review the project structure and remove files or directories that are no longer needed.
*   **Remove dead code:** Delete code that is no longer reachable or executed. This includes commented-out code that won't be used again.
*   **Refactor or delete deprecated features:** If a feature is replaced or no longer supported, remove its associated code.

## Agent Interaction Guidelines

To ensure effective collaboration and high-quality output:

1.  **Planning Mode First:** Always start in planning mode. Do not make any changes or execute actions before explicit approval. Ask "Tell me to act, I am ready" and only take actions and make changes when the user tells you "Act".
2.  **Multiple Perspectives:** Always consider multiple perspectives when planning to make changes. Present these to users as options.
3.  **Self-Verification:** Always do self-verification of your chain of thought and planning. Ensure it is truthful, accurate, and accomplishes the true end goal.
4.  **Clarify Low Confidence:** Always clarify with the user if the confidence in your answer is low. Also, annotate options with your confidence.
5.  **Testing and Verification:** Always think about how to test and verify your change after you make it.

## Design System Adherence and Aesthetic Guidelines

To ensure a cohesive and high-quality user experience, all UI development must strictly adhere to our internal design system and aesthetic principles.

**Principles:**
*   **Component-First Approach:** Prefer creating and using Svelte components over raw HTML elements. Every distinct UI element or pattern should ideally be encapsulated within a component.
*   **Design Tokens:** Define and utilize design tokens for typography, color, spacing, and other styling attributes. These should be managed centrally (e.g., in `variables.css`) to ensure consistency and ease of modification. Create new tokens as needed.
*   **Cohesive Styling:** All components and styles must contribute to a unified aesthetic. The keywords guiding our design are: **"clean girl aesthetic, cozy, cute, comfy"**.
*   **Reusability:** Design components to be reusable across the application, reducing redundancy and promoting maintainability.
