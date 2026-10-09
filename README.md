# Vanilla JS Habit & Focus Logger

https://merry-empanada-d329bc.netlify.app/

Key Features: LocalStorage Persistence, Dynamic Focus Time calculation using .reduce(), Keyboard accessibility/form handling, Confirmation before wiping data.

Tech Stack: Vanilla JavaScript (ES6+), HTML5, Modern CSS.

 Architecture Insights & Key Learnings

- **Single Source of Truth:** Multiple desynchronized arrays hatakar ek centralized `tasks` array maintain kiya. Saara data state `localStorage` se sync hota hai aur UI hamesha isi state se derive hoti hai.
- **Unidirectional Render Pipeline:** DOM elements ko directly mutate karne ke bajaye declarative `renderTasks()` pattern use kiya. Jab bhi state update hoti hai (Add/Delete/Clear), render engine pure UI ko clean paint karta hai jisse state-DOM drift bugs eliminate ho gaye.
- **Defensive Aggregation with `.reduce()`:** Total focus duration calculate karne ke liye `Array.prototype.reduce()` implement kiya. Initial value `0` pass karke runtime crash handle kiya jab tasks array khali ho, aur string inputs ko `Number()` se cast karke type-coercion bugs avoid kiye.
- **Event Delegation & Form Handling:** Window-level event hijacking hatakar semantic `<form>` submit handlers lagaye, jisse `Enter` key support bina unintended global side-effects ke execute hoti hai.
