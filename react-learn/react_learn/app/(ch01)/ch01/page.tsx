'use client';

import MyButton from './client';
import {useState} from 'react';

// http://localhost:3000/ch01

function Greeting({ name }) {
    return <h1>Hello, {name}</h1>;
}

// function MyButton() {
//     return (
//         <button>mybutton</button>
//     );
// }

// export default function MyApp() {
//     return (
//         <div>
//             <h1>welcome to my app</h1>
//             <MyButton/>
//         </div>
//     );
// }




const user = {
  name: 'AAAA BBBB',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

const products = [
  {title: "AA", id: 1},
  {title: "BB", id: 2},
  {title: "cc", id: 7},
];

const listItems = products.map(prod => 
  <li key={prod.id}>
    {prod.title}
  </li>
)

export default function MyApp() {

  const [cnt, setCnt] = useState(0);
  function handleClick() {
    setCnt(cnt + 1);
  }

  return (
    <div>
      <h1>欢迎来到我的应用</h1>
      <MyButton cnt={cnt} onClick={handleClick} />
      <MyButton cnt={cnt} onClick={handleClick} />
      <Greeting name="ckb" />
      <hr />

      <h2>{user.name}</h2>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
      <hr />

      {/* {isLogged?(
        <AdminPanel/>
      ) : (
        <LoginForm/>
      )} */}

      <ul>{listItems}</ul>
      

    </div>
  );
}
