import Select, { SingleValue } from 'react-select';
import { editRow } from '../service/api';
import { options } from './Home';
import {useRef, useState} from 'react';

// let options: OptionType[] = [];

// getDatabase().then(res => {
//   console.log(res.data);
//   Object.keys(res.data).map(key => options.push({label: key, value: key}));
// })

function Update() {
  const [selectTable, setSelectTable] = useState<string>("");

  const idInp = useRef<HTMLInputElement>(null);
  const jsonInp = useRef<HTMLInputElement>(null);

  const onChangeSelect = (e: SingleValue<{label: string, value: string}>) => {
    if(e && e.value!==undefined){
      setSelectTable(() => e.value);
    }
  }

  const handlePut = () => {
    if(idInp.current?.value && jsonInp.current?.value && selectTable!==""){
      editRow(selectTable, idInp.current.value, JSON.parse(jsonInp.current.value))
    }else{
      console.log("Error");
    }
  }

  return (
    <main>
      <Select options={options} defaultValue={{label: '...', value: ''}} onChange={onChangeSelect} />
      <input type="text" placeholder='enter id that you want to change' ref={idInp} />
      <input type="text" placeholder='enter new value (JSON)' ref={jsonInp} />
      <input type="submit" onClick={handlePut} />
    </main>
  )
}

export default Update