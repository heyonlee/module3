import { useEffect, useState } from "react";
import Preloader from "./components/preloader";
import { createTodo, deleteTodo, readTodos, updateTodo } from "./functions";

import "materialize-css/dist/css/materialize.min.css";

function App() {
  const [todo, setTodo] = useState({
    title: "",
    content: "",
    priority:""
  });
  const [todos, setTodos] = useState(null);
  const [currentId, setCurrentId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const result = await readTodos();
      setTodos(result);
    };
    fetchData();
  }, [currentId]);
  useEffect(() => {
    let currentTodo =
      currentId !== 0
        ? todos.find((todo) => todo._id === currentId)
        : { title: "", content: "" };
    setTodo(currentTodo);
  }, [currentId]);
  const clear = () => {
    setCurrentId(0);
    setTodo({ title: "", content: "" });
  };
  // useEffect(() => {
  //   const clearField = (e) => {
  //     if (e.keyCode === 27) {
  //       clear();
  //     }
  //   };

  //   window.addEventListener("keydown", clearField);
  //   return () => window.removeEventListener("keydown", clearField);
  // }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentId === 0) {
      const result = await createTodo(todo);
      setTodos([...todos, result]);
       clear();
    } else {
      await updateTodo(currentId, todo);

       clear();
    }
  };

  const removeTodo = async (id) => {
    await deleteTodo(id);
    const todosCopy = [...todos];
    todosCopy.filter((todo) => todo._id !== id);
    setTodos(todosCopy);
    clear()
  };
  return (

   



    <div className="container #ffcc80 orange lighten-3">
 <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">TodoList</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">this week</a></li>
        <li><a href="badges.html">this month</a></li>
        <li><a href="collapsible.html">this year</a></li>
      </ul>
    </div>
   </nav>


      <div className="row">
        {/* <pre>{JSON.stringify(todo)}</pre> */}
        <form className="col s12" onSubmit={onSubmitHandler}>
          <div className="row">
            <div className="input-field col s4 offset-s2">
              <i className="material-icons prefix">title</i>
              <input
                id="icon_prefix"
                type="text"
                value={todo.title}
                className="validate"
                onChange={(e) => setTodo({ ...todo, title: e.target.value })}
              />
              <label htmlFor="icon_prefix">Title</label>
            </div>
            <div className="input-field col s4">
              <i className="material-icons prefix">description</i>
              <input
                id="description"
                type="tel"
                value={todo.content}
                className="validate"
                onChange={(e) => setTodo({ ...todo, content: e.target.value })}
              />
              <label htmlFor="description">Content</label>
            </div>
          </div>
          <div className="row center-align">
            <button className="waves-effect waves-light btn">submit</button>
          </div>
        </form>


        {!todos ? (
          <Preloader />
        ) : todos.length > 0 ? (
          <ul className="collection">
            {todos.map((todo) => (
              <li 
                key={todo._id}
                onClick={() => setCurrentId(todo._id)}
                className="collection-item #ffcc80 orange lighten-3"
              >
                <div>
                  <h5>{todo.title}</h5>
                  <p>
                    {todo.content}
                    <a
                      href="#!"
                      onClick={() => removeTodo(todo._id)}
                      className="secondary-content"
                    >
                      <i className="material-icons">delete</i>
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="center-align">
            <i className="small material-icons #3e2723">tag_faces</i><i className="small material-icons #3e2723">tag_faces</i><i className="small material-icons #3e2723">tag_faces</i>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
