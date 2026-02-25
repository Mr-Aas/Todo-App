import { useState, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoSaveSharp } from "react-icons/io5";
import './App.css'
import { v4 as uuidv4 } from 'uuid';

import Navbar from './components/Navbar'
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setShowfinished] = useState(false)

  useEffect(() => {
    let todoexits = localStorage.getItem("todos")
    if (todoexits) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])



  const savetodo = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
    // savetodo()

  }


  const handleadd = (e) => {
    if (todo.trim() === "") return;
    settodos([...todos, { todo, id: uuidv4(), iscompleted: false }]);
    savetodo();
    settodo("")
  }
  const handlechange = (e) => {
    settodo(e.target.value);

  }
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodo = [...todos];
    newtodo[index].iscompleted
      = !newtodo[index].iscompleted;
    settodos(newtodo)
    savetodo();
  }
  const handledelete = (e, id) => {
    console.log(id)
    let newtodo = todos.filter(item => {
      return item.id !== id;
      savetodo();
    });

    settodos(newtodo)
  }
  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    settodo(t[0].todo)
    let newtodo = todos.filter(item => {
      return item.id !== id;
    });
    settodos(newtodo)
    savetodo();
  }
  const handleshowfinished = (e) => {
    setShowfinished(!showfinished)
  }



  return (
    <>
      <Navbar />
      <div className="body mx-auto min-h-[70vh] w-[80vw] bg-blue-200 my-3 rounded-[15px] border-b-blue-950 ">

        <div className="addtodo  bg-blue-300  h-20 "> <div className='text-xl py-2 mx-1'>Add Todos</div>
          <div className="flex h-6 ">
            <input type="text" onChange={handlechange} value={todo} className='w-2/3 border  bg-amber-50 mx-1 px-2' placeholder='success is beyond of only thinkers' />
            <button className="bg-blue-700 cursor-pointer  text-white rounded-sm flex items-center justify-center w-12  "  onClick={handleadd}><IoSaveSharp /></button>
          </div>
        </div>
        <input type="checkbox" onClick={handleshowfinished} onChange={handleshowfinished} checked={showfinished} /> show finished
        <div className="yourtodos">
          <div className="label text-xl">Your Todos</div>
          {todos.length === 0 && <div className='mx-40 my-6'> No Todos to Display</div>}
          {todos.map(items => {
            return (showfinished || !items.iscompleted) && (
              <div key={items.id} className="todos flex justify-between my-3">
                <div className="text flex items-center gap-2 mx-1">
                  <input type="checkbox" onChange={handlecheckbox} checked={items.iscompleted} name={items.id} />
                  <div className={items.iscompleted ? "line-through" : ""}>{items.todo}</div></div>
                <div className="buttons flex gap-2 mx-3">
                  <button onClick={e => handleedit(e, items.id)} className='bg-blue-700 hover:invert  flex items-center justify-center cursor-pointer hover:font-bold text-white rounded-sm  w-12'><FaRegEdit /></button>
                  <button onClick={(e) => handledelete(e, items.id)} className='bg-blue-800 cursor-pointer hover:invert text-white rounded-sm flex items-center justify-center w-12 '><MdDelete /></button>
                </div>
              </div>
            )
          })}
        </div>

      </div>


    </>
  )
}

export default App
