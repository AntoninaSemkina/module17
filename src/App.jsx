import { useUnit } from "effector-react";
import "./App.css";
import {
  addItem,
  addManyItems,
  counter,
  fetchItems,
  increment,
  itemsStore,
  removeItem,
  setCounter,
} from "./store/store";
import { useState } from "react";

function App() {
  const [inputName, setInputName] = useState("");

  const [items, addListItem, removeListItem, addManyListItems] = useUnit([
    itemsStore,
    addItem,
    removeItem,
    addManyItems,
  ]);
  const [count, onIncrement, setCount] = useUnit([
    counter,
    increment,
    setCounter,
  ]);

  return (
    <div className="App">
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button
        className="save"
        onClick={() => {
          addListItem({ id: count, name: inputName });
          setInputName("");
          onIncrement();
        }}
      >
        Сохранить
      </button>
      <button
        className="loading"
        onClick={async () => {
          addManyListItems(await fetchItems());
          setCount(4);
        }}
      >
         Подгрузить стандартные задачи
      </button>
      {items.map((item) => (
        <div className="mainBox">
          <div key={item.id}>
            {item.id}|{item.name}
          </div>
          <button onClick={() => removeListItem(item.id)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default App;
