import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { v4 as uuidv4 } from 'uuid';

import Navbar from './components/Navbar'
function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  const handleadd = (e) => {
    settodos([...todos, { todo, id: uuidv4(), iscompleted: false }])
  }
  const handlechange = (e) => {
    settodo(e.target.value)
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
  }
  const handledelete = (e,id) => {
console.log(id)
    let newtodo = todos.filter(item => {
      return item.id !== id;
    });
    
    settodos(newtodo)
  }



  return (
    <>
      <Navbar />
      <div className="body mx-auto min-h-[70vh] w-[80vw] bg-blue-200 my-3 rounded-[15px] border-b-blue-950 ">

        <div className="addtodo  bg-blue-300 py-2 h-20 "> <div className='text-xl'>Add Todos</div>
          <input type="text " onChange={handlechange} value={todo} className='w-2/3 border my-2 bg-amber-50 mx-1' placeholder='netadsds' />
          <button className="bg-blue-700 hover:bg-blue-900 cursor-pointer hover:font-bold text-white rounded-sm  w-12" onClick={handleadd}>add</button>
        </div>
        <div className="yourtodos">
          <div className="label text-xl">Your Todos</div>
          {todos.length === 0 && <div className='mx-40 my-6'> No Todos to Display</div>}
          {todos.map(items => {
            return (
              <div key={items.id} className="todos flex justify-between my-3">
                <div className="text flex items-center gap-2 mx-1">
                  <input type="checkbox" onChange={handlecheckbox} value={items.iscompleted} name={items.id} />
                  <div className={items.iscompleted ? "line-through" : ""}>{items.todo}</div></div>
                <div className="buttons flex gap-2 mx-3">
                  <button className='bg-blue-700 hover:bg-blue-900 cursor-pointer hover:font-bold text-white rounded-sm  w-12'>edit</button>
                  <button onClick={(e)=>handledelete(e,items.id)} className='bg-blue-700 hover:bg-blue-900 cursor-pointer hover:font-bold text-white rounded-sm  w-12 '>delete</button>
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
