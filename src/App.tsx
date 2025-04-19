import { ToastContainer } from "react-toastify";
import Hero from "./components/hero";
import { TodoList } from "./components/todo-list";


function App() {
  return (
  
      <div className="flex flex-col h-screen">
      <section>
        <Hero />
      </section>
      <section className="flex flex-col items-center z-5 space-y-5">
       
        <TodoList />
         <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
        />
      
   
      </section>
    </div >
      
      
  );
}

export default App;
