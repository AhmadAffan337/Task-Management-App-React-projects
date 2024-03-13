import { useDispatch, useSelector } from "react-redux";
import { add, remove,edit_values} from "./TaskSlice";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";



export const TaskManagement = () => {
  const data = useSelector((state) => state.task.students);

  const dispatch = useDispatch();
  const [current_ID, setid] = useState(-9);

  const [edit,setedit]=useState(0)

  const [editTask,seteditTask]=useState({})
  

  const [task, settask] = useState({id:-9,taskname:'',currentdate:''});

  const [error, setError] = useState("");

  const Task_Delete = (id) => {
    dispatch(remove(id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      error === "" &&
      Object.keys(task).length !== 0 &&
      task.taskname !== ""
    ) {
      dispatch(add(task));

      
    }

    GenerateID();
    settask({
      ...task,
      id: current_ID,
      taskname: "",
      currentdate: new Date().toLocaleString(),
    });
  };

  const handleInput = (event) => {
    if (event.target.value.trim() === "") {
      setError("Please enter values");
    } else {
      setError("");
    }

    settask({
      ...task,
      id: current_ID,
      taskname: event.target.value,
      currentdate: new Date().toLocaleString(),
    });
  };

  const GenerateID = () => {
    var id = Math.random().toString(36);
    setid(id);
  };

  const handle_Edit=(id)=>
  {
    setedit(1)
    
    const edited_task=data.find((e)=>e.id===id)
    seteditTask(edited_task)


  }

  const Confirm_Edit=()=>
  {

    
    dispatch(edit_values({...editTask}))
    setedit(0)
  }

  const Input_Edit=(e)=>
  {
     seteditTask({...editTask,taskname:e.target.value})
  }



  return (
    <div className="flex">
      <div className="ml-96 mt-20 bg-white shadow-md p-10 rounded-md">
        <div className="mb-5">
          <p className="font-extrabold font-mulish text-md">
            Welcome to task manangement application!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row ">



             <div className="flex w-80 flex-col">
            {edit===0?<Input
              custom="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              placeholder="Enter task"
              type="text"
              value={task.taskname}
              onChange={(e) => {
                handleInput(e);
              }}
            ></Input>:
            
            <Input
              custom="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              type="text"
              value={editTask.taskname}
              onChange={(e) => {
                Input_Edit(e);
              }}
            ></Input>
            
            }



            <div className="text-red-700">{error}</div>
            </div>

           {edit===0? <Button
              text="ADD"
              type="submit"
              custom="bg-blue-400  hover:bg-blue-500 text-white h-10 font-bold py-1 px-2 rounded"
            />:

            <Button
              text="DONE"
              onClick={()=>{Confirm_Edit()}}
              type="submit"
              custom="bg-stone-200  hover:bg-stone-300 text-white h-10 font-bold py-1 px-2 rounded shadow-md"
            />

           }




          </div>
        </form>

        <ul className="mt-5 w-96">
          {data.map((e) => (
            <div className="flex flex-row justify-between">
              <div  className="font-bold text-cyan-900 font-mulish">{e.taskname}</div>

              <div className="flex flex-row space-x-2">
                <div  className="text-xs mt-1.5 font-bold text-gray-400">
                  {e.currentdate}
                </div>

                <div>
                  <Button
                    text="EDIT"
                    type="button"
                    onClick={()=>{handle_Edit(e.id)}}
                    custom=" bg-green-400 hover:bg-green-600 text-white text-xs h-5 w-10 font-bold py-0.5 rounded"
                  />
                </div>
                <div>
                  <Button
                    text="DONE"
                    type="button"
                    onClick={() => {
                      Task_Delete(e.id);
                    }}
                    custom="bg-red-400 hover:bg-red-600 text-white text-xs h-5 w-10 font-bold py-0.5 rounded"
                  />
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
