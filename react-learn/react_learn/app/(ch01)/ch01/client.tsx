'use client';

import {useState} from 'react';

export default function MyButton({cnt, onClick}) {
    
    // const [cnt, setCnt] = useState(0);
    
    // function handleClick() {
    // //   alert("clicked");
    //     setCnt(cnt + 1);
    // }
  
    return (
      <button onClick={onClick}>
        我是一个按钮_{cnt}
      </button>
    );
}
