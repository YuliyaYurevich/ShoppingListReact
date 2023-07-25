import { useState } from 'react';
import './index.css';

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item
      )
    );
  }

  function handlePlus(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleMinus(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  return (
    <div className="app">
      <div className="card">
        <Input onAddItems={handleAddItems} />
        <ShoppingList
          items={items}
          onToggleItem={handleToggleItem}
          onClickPlus={handlePlus}
          onClickMinus={handleMinus}
        />
        <Total items={items} />
      </div>
    </div>
  );
}

function Input({ onAddItems }) {
  const [item, setItem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!item) return;

    const id = crypto.randomUUID();

    const newItem = { id, item, quantity: 1, bought: false };
    onAddItems(newItem);

    setItem('');
  }

  return (
    <form className="add-item-box" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-item-input"
        placeholder="Add an item..."
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function ShoppingList({ items, onToggleItem, onClickPlus, onClickMinus }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          item={item}
          onToggleItem={onToggleItem}
          onClickPlus={onClickPlus}
          onClickMinus={onClickMinus}
        />
      ))}
    </ul>
  );
}

function Item({ item, onToggleItem, onClickPlus, onClickMinus }) {
  return (
    <li className="item-container">
      <div className="item-name">
        <input
          type="checkbox"
          value={item.bought}
          onChange={() => {
            onToggleItem(item.id);
          }}
        />

        <span className={item.bought ? 'completed' : ''}>{item.item}</span>
      </div>

      <div className="quantity">
        <button onClick={() => onClickMinus(item.id)}>-</button>
        <span> {item.quantity}</span>
        <button onClick={() => onClickPlus(item.id)}>+</button>
      </div>
    </li>
  );
}

function Total({ items }) {
  const total = items
    .filter((item) => !item.bought)
    .reduce((accumulator, object) => {
      return accumulator + object.quantity;
    }, 0);

  return <div className="total">Total: {total}</div>;
}
