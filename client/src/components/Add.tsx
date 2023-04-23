import Select, { SingleValue } from 'react-select';
import {useState, useRef} from 'react';
import { addRow, addTable } from '../service/api';
import { options } from './Home';

const addOptions = [
  {label: "Add Row", value: "row"},
  {label: "Add Table", value: "table"}
]

// let options: OptionType[] = [];

// getDatabase().then(res => {
//   console.log(res.data);
//   Object.keys(res.data).map(key => options.push({label: key, value: key}));
// })

function Add() {
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
      addRow(selectTable, JSON.parse(rowInput.current?.value));
    }else{
      console.log("Error");
    }
  }
  const handleTable = () => {
    if(tableRef.current?.value){
      addTable(tableRef.current.value);
    }else{
      console.log("Error");
    }
  }

  const tableRef = useRef<HTMLInputElement>(null);
  const rowInput = useRef<HTMLInputElement>(null);
  return (
    <main>
      <Select options={addOptions} defaultValue={{label: "...", value: ""}} onChange={onChangeHandler} />
      {selST!=='' && (selST==="row" ? 
        <>
          <Select options={options} defaultValue={{label: '...', value: ''}} onChange={onChangeSelect} />
          <input type="text" placeholder='enter json expression' ref={rowInput} />
          <input type="submit" onClick={handleRow} />
        </>
      : 
        <>
          <input type="text" placeholder='enter table name' ref={tableRef} />
          <input type="submit" onClick={handleTable} />
        </>
      )}
    </main>
  )
}

export default Add