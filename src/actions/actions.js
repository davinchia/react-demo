// Function to generate UID
const uid = () => Math.random().toString(34).slice(2);

// Each action returns a type (of action) and content that is parsed by the reducer.
// We call this in container.js
export function addToDo(text) {
  return {
    type: "ADD_TODO",
    payload: {
      id: uid(),
      isDone: false,
      text: text
    }
  }
}

export function toggleToDo(id) {
  return {
    type: "TOGGLE_TODO",
    payload: id
  }
}

export function receivedTasks(tasks) {
  return {
    type: "RECEIVED_TASKS",
    payload: tasks
  }
}

export function fetchTasks() {
  return function(dispatch) {
    return fetch('http://localhost:3001/initialTasks')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        // console.log(stories);
        dispatch(receivedTasks(stories));
    });
  }
}

