import { useEffect, useState } from 'react';
import Select, {SingleValue} from 'react-select';
import { DBData, getAllData, getDatabase } from '../service/api';

export type OptionType = {
  label: string,
  value: string;
}
export let options: OptionType[] = [];

getDatabase().then(res => {
  console.log(res.data);
  Object.keys(res.data).map(key => options.push({label: key, value: key}));
})

const Home = () => {
  const [table, setTable] = useState<string>('');
  const [data, setData] = useState<DBData>();
  
  useEffect(() => {
    if(table!==''){
      console.log(table)
      getAllData(table).then(res => setData(() => res.data));
    }
  }, [table]);

  const onChangeSelect = (e: SingleValue<{label: string, value: string}>) => {
    if(e && e.value!==undefined){
      setTable(() => e.value);
    }
  }

  return (
    <main>
      <Select options={options} defaultValue={{label: '...', value: ''}} onChange={onChangeSelect} />
      {table!=='' && <p className='p-table'>{JSON.stringify(data)}</p>}
    </main>
  )
}

export default Home;