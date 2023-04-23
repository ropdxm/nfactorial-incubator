import { useRef, useState } from 'react';
import Select, {SingleValue} from 'react-select';
import { DBData, getAllData, getDatabase } from '../service/api';

export type OptionType = {
  label: string,
  value: string;
}
export let options: OptionType[] = [];

const sortOptions: OptionType[] = [
  {label: "sort in ascending order", value: "1"},
  {label: "dont sort in ascending order", value: "0"}
]
const defaultValue = {label: '...', value: ''}
getDatabase().then(res => {
  console.log(res.data);
  Object.keys(res.data).map(key => options.push({label: key, value: key}));
})

const Home = () => {
  const [table, setTable] = useState<string>('');
  const [data, setData] = useState<DBData>();
  const [show, setShow] = useState<boolean>(false);
  const [shouldSort, setShouldSort] = useState<boolean | undefined>(undefined);

  // useEffect(() => {
  //   if(table!==''){
  //     console.log(table)
  //     getAllData(table).then(res => setData(() => res.data));
  //   }
  // }, [table]);

  const onChangeSelect = (e: SingleValue<{label: string, value: string}>) => {
    if(e && e.value!==undefined){
      setTable(() => e.value);
    }
  }
  const onChangeSort = (e: SingleValue<{label: string, value: string}>) => {
    if(e && e.value!==undefined){
      setShouldSort(() => e.value==="1" ? true : false);
    }
  }

  const filterRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if(table!=='' && shouldSort!==undefined){
      const configReq = {sorted: shouldSort, filterByProperty: filterRef.current?.value};
      getAllData(table, configReq).then(res => {
        console.log(res.data);
        setData(() => res.data);
      })
      setShow(true);
    }else{
      alert('Please select inputs')
    }
  }

  return (
    <main>
      <Select options={options} defaultValue={defaultValue} onChange={onChangeSelect} />
      <Select options={sortOptions}  defaultValue={defaultValue} onChange={onChangeSort} />
      <input placeholder='if you want to sort, then by what property? (leave blank if by default, id)' ref={filterRef} />
      <input type="submit" onClick={handleClick} />
      {show && <p className='p-table'>{JSON.stringify(data)}</p>}
    </main>
  )
}

export default Home;