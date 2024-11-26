import { createEffect, createEvent, createStore, fork } from "effector";

export const addItem = createEvent();
export const removeItem = createEvent();
export const addManyItems = createEvent();

export const itemsStore = createStore([])
  .on(addItem, (state, item) => [...state, item])
  .on(removeItem, (state, itemId) => state.filter((item) => item.id !== itemId))
  .on(addManyItems, (state, items) => (state = items));

export const increment = createEvent();
export const setCounter = createEvent();

export const counter = createStore(0)
  .on(increment, (state) => state + 1)
  .on(setCounter, (state, count) => (state = count));

export const fetchItems = createEffect();

fetchItems.use(async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const arr = [
        { id: 1, name: "name1" },
        { id: 2, name: "name2" },
        { id: 3, name: "name3" },
      ];
      resolve(arr);
    }, 1000);
  });
});

export const scope = fork();
