import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LocaleContext } from '../models/context';
import './index.less';

export default function(props) {
  // const {data} = useSWR('postDemo', key => fetch(key, {a: 1}));
  // const { data } = useSWR('putDemo', key => fetch(key, { title: 'test', id: 2 }));
  // console.log('data', data);
  // const title = data?.data?.title;
  // async function fetchData() {
  //   const { data } = await fetch('getDemo');
  //   console.log('effect', data);
  // }
  //   useEffect(_ => {
  //     fetchData();
  //   }, []);
  const value = useContext(LocaleContext);
  return (
    <div className="App-header">
      <nav>
        <Link to="/index">Home</Link>
        <br />
        <Link to="/demo">demo</Link>
        <br />
        <Link to="/login">login</Link>
        <hr />
      </nav>
      <p className="primary">Demo Page</p>
      <div>
        <div className="demo1">{value?.data?.title}</div>
        <div className="demo2">{value?.data?.title}</div>
        <div className="demo3">{value?.data?.title}</div>
        <div className="demo4">{value?.data?.title}</div>
        <div className="demo5">{value?.data?.title}</div>
      </div>
    </div>
  );
}
