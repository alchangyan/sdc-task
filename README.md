# Kanban board

> a react-based test task

**Instructions:**

- Please try to do as much as you can by yourself without using too many libraries
- Create a React program, and use Material-UI for this project.
- Write unit tests or whatever you think is essential for the project.
- Use git for version control.
- Ask clarifying questions in a written form via email if necessary.
- Document your assumptions in the code comments.
- Submit the work by archiving the project into a “zip” archive and sharing it via email. Please use WeTransfer or similar tools to submit your work.

# Program description

Let’s say you have following data

```javascript
const data = [
  {
    type: "card",
    status: "to do",
    description: "task that needs to be done 1",
    user: 1,
  },
  {
    type: "card",
    status: "doing",
    description: "task that needs to be done 2",
    user: 1,
  },
  {
    type: "card",
    status: "doing",
    description: "task that needs to be done 3",
    user: 2,
  },
  {
    type: "card",
    status: "done",
    description: "task that needs to be done 4",
    user: 2,
  },
];

const users = [
  {
    id: 1,
    name: "a",
  },
  {
    id: 2,
    name: "b",
  },
];
```

Based on this data, create a Kanban board with these cards in it. There should be 3 columns in the board:

- to do
- doing
- done

Every card should be movable across columns - whether it’s a drag and drop or dropdown menu inside a card it’s up
to you. “State” should be saved in localstorage, upon refresh all the cards should be in the position that was before
refresh.

Use your personal preferences for the design of the project and have everything in place.

Good luck!
