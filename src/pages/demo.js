import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './index.less';
import { useStore } from '../utils/store';
import '../models/demo';
import TestHook from '../components/demo/globalHook';

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
  const [state, dispatch] = useStore('demo');
  console.log('state', state);
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
      <div>{state?.count}</div>
      <Button type="primary" onClick={_ => dispatch({ type: 'minus' })}>
        minus
      </Button>
      <TestHook />
      {/* <div>
        <div className="demo1">{value?.data?.title}</div>
        <div className="demo2">{value?.data?.title}</div>
        <div className="demo3">{value?.data?.title}</div>
        <div className="demo4">{value?.data?.title}</div>
        <div className="demo5">{value?.data?.title}</div>
      </div> */}
    </div>
  );
}
