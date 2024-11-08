import {useEffect, useState, useRef} from 'react';
import {fetchers} from './fetchers';
import './App.css';

function App() {
  const {getToDos,addToDo,editToDo,removeToDo,removeAllToDos} = fetchers;
  const [items, setItems] = useState([]);
  const [currentEditToDo, setCurrentEditToDo] = useState([]);
  const [errorInput, setErrorInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputText, setInputText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    getToDos(setItems);
  }, []);

  const submitForm = e => {
    e.preventDefault();
    if(inputText === "") {
      setErrorInput(true);
      return;
    }

    if(editMode) {
      const currentEditItem = items.find(item => item._id === currentEditToDo._id);
      currentEditItem.value = inputText;
      editToDo(currentEditToDo._id, currentEditItem.value);
      setEditMode(false);
      setInputText("");
      setCurrentEditToDo("");
      return;
    }

    addToDo({"value": inputText}, setItems, items, setInputText);
  };

  const removeAll = () => {
    setItems([]);
    removeAllToDos();
    setEditMode(false);
    setInputText("");
  };

  const removeItem = (_id) => {
    const newArray = [...items];
    newArray.splice(newArray.findIndex(arrayItem => arrayItem._id === _id) , 1);
    setItems(newArray);
    removeToDo(_id);
    setEditMode(false);
    setInputText("");
  };

  const updateItem = (_id) => {
    if(errorInput) {
      setErrorInput(false);
    }
    setEditMode(true);
    const itemToEdit = items.find(arrayItem => arrayItem._id === _id);
    setCurrentEditToDo(itemToEdit);
    setInputText(itemToEdit.value);
  };

  const getInputValue = e => {
    if(errorInput) {
      setErrorInput(false);
    }
    setInputText(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={submitForm}>
        <input ref={inputRef} className={errorInput ? 'error' : editMode ? 'edit-mode' : ''} type="text" onChange={getInputValue} value={inputText} placeholder={errorInput ? 'Please enter something first' : 'Enter your todo'}/>
        {errorInput ? <button className="error" type="submit">X</button> : editMode ? <button className="edit-form-btn" type="submit">Edit</button> : <button className="add-form-btn" type="submit">Add</button>}
      </form>
      <div className='item-holder'>
        {items.map(({_id,value})=> {
          return (
            <div className={_id === currentEditToDo._id ? 'edit-item item' : 'item'} key={_id}>
              <p>{value}</p>
              { <div className='btn-holder'>
                <button className='edit-btn' onClick={() => {
                  updateItem(_id);
                  inputRef.current.focus();
                  }}>Edit</button>
                <button className='delete-btn' onClick={() => removeItem(_id)}>Delete</button>
              </div>
              }
            </div>
          )
        })}
      </div>
      <button className='remove-all-btn' onClick={removeAll}>Delete All Todos</button>
    </div>
  );
}

export default App;
