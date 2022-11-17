import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const [task, setTask] = useState("")
  const [tasklist, setTasklist] = useState([])

  // -----------------------------------ADD TASK-------------------------------------------------
  const AddTask = () => {
    if (task.length === 0) {
      alert("we can't add empty task")
    } else {
      setTasklist([...tasklist, task])
      setTask("")
    }
  }
  // -----------------------------------DELELTE TASK-------------------------------------------------
  const handelDelete = (text) => {
    const copytasklist = tasklist.filter((task) => {
      return task !== text
    });
    setTasklist(copytasklist)
  }
  // -----------------------------------SAVE EDIT TASK-------------------------------------------------
  const savedit = (text, id) => {
    const copytasklist = [...tasklist]
    copytasklist[id] = text
    setTasklist(copytasklist)
    alert('your data updated sucessfuly')

  }

  // -----------------------------------RETURN HTML-------------------------------------------------
  return (
    <div className="App">
      <h1>Todo App</h1>
      <input value={task} onChange={(e) => { setTask(e.target.value) }}></input>
      <button className='button' onClick={() => AddTask()}>ADD</button>

      {tasklist.map((taskitem, itr) => (
        <div className='result'>
          {/* -----------------CALL CHILD FUNCTION------------------------------ */}
          <SubApp task={{ taskitem: taskitem, itr: itr, savedit: savedit }} />
          {/* -------------------DELETE BUTTON---------------------------------- */}
          <button className='button' onClick={() => { handelDelete(taskitem) }}>DELETE</button>
        </div>
      ))}
      <p>TOTAL TASK : {tasklist.length}</p>
    </div>
  );
}

// -----------------------------------CHILD FUNCTION-------------------------------------------------
function SubApp(props, { savedit }) {
  const [isChecked, setisChecked] = useState(false)
  const [edit, setedit] = useState(false)
  const [edittask, setedittask] = useState(props.task.taskitem)



  // -----------------------------------FOR CHECKBOX-------------------------------------------------
  const handelcheckbox = () => {
    setisChecked(!isChecked)

    if (edit) {
      setedit(!edit)
    }
    console.log('checked')
  }
  // -----------------------------------FOR EDIT-------------------------------------------------
  const handeledit = () => {
    setedit(!edit)
    console.log('button clicked')
    if (isChecked) {
      setisChecked(!isChecked)
    }
  }
  // -----------------------------------CLOSING EDIT BUTTON-------------------------------------------------
  const closeedit = () => {
    setedit(!edit)
  }

  // -----------------------------------RETURN HTML-------------------------------------------------
  return (
    <>
      <input type='checkbox' checked={isChecked} onChange={() => { handelcheckbox() }}></input>
      {/* ----------------------SHOWING TASK DATA----------------------------------- */}
      {isChecked ? <p><del className='delete'>{props.task.taskitem}</del></p> : <p>{props.task.taskitem}</p>}
      {/* -------------------------SHOWING EDIT ,SAVE AND CLOSE BUTTON-------------------- */}
      {edit ? <div><input value={edittask} onChange={(e) => (setedittask(e.target.value))}></input> <button className='button' onClick={(e) => props.task.savedit(edittask, props.task.itr)}>SAVE</button><button className='button' onClick={closeedit}>CLOSE</button> </div> : <button className='button' onClick={() => handeledit()}>EDIT</button>}
    </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />)
export default App;
