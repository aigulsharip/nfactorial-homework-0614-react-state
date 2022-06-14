import { useState } from "react";
import { v4 as myNewID } from "uuid";

import "./App.css";

// button-group
const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "active",
    label: "Active",
  },
  {
    type: "done",
    label: "Done",
  },
];

function App() {
  const [itemToDo, setItemToDo] = useState("");
  const [items, setItems] = useState([
    {
      key: 1,
      label: "Have fun",
    },
    {
      key: 2,
      label: "Spread Empathy",
    },
    {
      key: 3,
      label: "Generate Value",
    },
  ]);

  const [filterType, setFilterType] = useState("all");

  const [searchTerm, setSearchTerm] = useState("");

  const handleToDoChange = (event) => {
    setItemToDo(event.target.value);
    console.log("Print " + event.target.value)
  };

  const handleToInputChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Print " + event.target.value)
  };

  const handleAddItem = () => {
    const newItem = { key: myNewID(), label: itemToDo };

    setItems((prevElement) => [newItem, ...prevElement]);

    setItemToDo("");
  };

  const handleItemDone = ({ key }) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.key === key) {
          return { ...item, done: !item.done };
        } else return item;
      })
    );
  };

  const handleItemImportant = ({ key }) => {
    setItems((allItems) =>
      allItems.map((item) => {
        if (item.key === key) {
          return { ...item, important: !item.important };
        } else return item;
      })
    );
  };


  //const newObj = {key:1,value:10,newItem:false};

  //const newObj2 = {...newObj,done:false}

  const selectImportant = (selectedItem) => {
    setItems((allImportantItems) => 
      allImportantItems.map ((item) => {
        if (item.key === selectedItem.key) {
          //return {...item, important: Boolean(item.important)===true?false:!Boolean(item.important)}

          return {...item, important: item.important? false:true}


          // item.done ? false:true
         
        }
        else return item;
      })
    );  
  } 


  const handleFilterChange = ({ type }) => {
    setFilterType(type);
  };

  const handleDeleteItem = ({key}) => {
    
    const findIndex = items.findIndex((item) => item.key === key);

    const leftSide = items.slice(0,findIndex)
    const rightSide = items.slice(findIndex+1, items.length);

    const newElements = leftSide + rightSide;

    setItems((prevElement) => [...leftSide,...rightSide]);

    //setItems((prevElement) => [...newElements]);
  }


  

  const moreToDo = items.filter((item) => !item.done).length;

  const doneToDo = items.length - moreToDo;

  const filteredArray =
    filterType === "all" ? items: filterType === "done" ? items.filter((item) => item.done) : items.filter((item) => !item.done);

  return (
    <div className="todo-app">
      {/* App-header */}
      <div className="app-header d-flex">
        <h1>Todo List</h1>
        <h2>
          {moreToDo} more to do, {doneToDo} done
        </h2>
      </div>

      <div className="top-panel d-flex">
        {/* Search-panel */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="type to search"
          value={searchTerm}
          onChange={handleToInputChange}
          

        />
        {/* Item-status-filter */}
        <div className="btn-group">
          {buttons.map((item) => (
            <button
              key={item.type}
              type="button"
              className={`btn btn-info ${
                filterType === item.type ? "" : "btn-outline-info"
              }`}
              onClick={() => handleFilterChange(item)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* List-group */}
      <ul className="list-group todo-list">
        {filteredArray.filter((val)=> {
          if (searchTerm ==="") {
            return val
          } else if(val.label.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }}).map((item) => (
            <li key={item.key} className="list-group-item">
              <span className={`todo-list-item ${item.done ? "done" : ""} ${item.important ? "important" : ""}` }>
                <span
                  className="todo-list-item-label"
                  onClick={() => handleItemDone(item)}
                >
                  {item.label}
                </span>

                <button
                  type="button"
                  className="btn btn-outline-success btn-sm float-right"
                  onClick = {() => selectImportant(item)}

                >
                  <i className="fa fa-exclamation" />
                </button>

                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm float-right"
                  onClick={() =>handleDeleteItem(item)}
                >
                  <i className="fa fa-trash-o" />
                </button>
              </span>
            </li>
          ))}
      </ul>

      <div className="item-add-form d-flex">
        <input
          value={itemToDo}
          type="text"
          className="form-control"
          placeholder="What needs to be done"
          onChange={handleToDoChange}
        />
        <button className="btn btn-outline-secondary" onClick={handleAddItem}>
          Add item
        </button>
      </div>
    </div>
  );
}

export default App;
