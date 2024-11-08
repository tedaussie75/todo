import axios from 'axios';
export const fetchers = {
    getToDos: async (setToDo) => {
        axios.get(process.env.REACT_APP_API_URL)
        .then(function ({data}) {
          if(data.length > 0 ) {
            setToDo([...data]);
          }
        })
        .catch(error => console.error('Erreur de JSON:', error.message));
    },
    addToDo: (toDo, setToDo, todoList, setInputText) => {
        axios.post(process.env.REACT_APP_API_URL + 'addToDo', toDo)
        .then(function (response) {
            const {data} = response;
            setToDo([...todoList, data]);
            setInputText("");
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    editToDo: (_id, value) => {
        axios.put(process.env.REACT_APP_API_URL + 'edit/' + _id, {value})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    removeToDo: (_id) => {
        axios.delete(process.env.REACT_APP_API_URL + 'delete/' + _id)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    removeAllToDos: () => axios.delete(process.env.REACT_APP_API_URL + 'delete-all')
}