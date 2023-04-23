import Select, { SingleValue } from 'react-select';
import {useState, useRef} from 'react';
import { deleteRow, deleteTable } from '../service/api';
import { options } from './Home';

const deleteOptions = [
  {label: "Delete Row", value: "row"},
  {label: "Delete Table", value: "table"}
]

function Delete() {
  const [selST, setSelST] = useState<string>("");
  const [selectTable, setSelectTable] = useState<string>("");
  const onChangeHandler = (e: SingleValue<{label: string, value: string}>) => {
    if(e){
      setSelST(() => e.value);
    }
  }
  
  const onChangeSelect = (e: SingleValue<{label: string, value: string}>) => {
    if(e && e.value!==undefined){
      setSelectTable(() => e.value);
    }
  }
  
  const handleRow = () => {
    if(selectTable!=="" && rowInput.current?.value){
      deleteRow(selectTable, rowInput.current.value);
    }else{
      console.log("Error");
    }
  }
  const handleTable = () => {
    if(selectTable!==""){
      deleteTable(selectTable);
    }else{
      console.log("Error");
    }
  }

  const rowInput = useRef<HTMLInputElement>(null);
  return (
    <main>
      <Select options={deleteOptions} defaultValue={{label: "...", value: ""}} onChange={onChangeHandler} />
      {selST!=='' && (selST==="row" ? 
        <>
          <Select options={options} defaultValue={{label: '...', value: ''}} onChange={onChangeSelect} />
          <input type="text" placeholder='enter id' ref={rowInput} />
          <input type="submit" onClick={handleRow} />
        </>
      : 
        <>
          <Select options={options} defaultValue={{label: '...', value: ''}} onChange={onChangeSelect} />
          <input type="submit" onClick={handleTable} />
        </>
      )}
    </main>
  )
}

export default Delete