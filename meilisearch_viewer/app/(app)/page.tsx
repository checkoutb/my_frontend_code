'use client';   // useEffect

import React, {useState, useEffect, useRef} from "react";
import {marked, MarkedOptions, Token} from 'marked';

// // /indexes/{index_uid}/documents/fetch
// function GetDocList() {

// }

// // /indexes
// function GetIndexId() {

// }

interface RenderMarkdownParam {
  mdtext: string,
}
function RenderMarkdown({mdtext}: RenderMarkdownParam) {    // ..那之前的 {mdtext} 是什么。  对象解构。。
  // console.log(mdtext);

  // 不解析图片。因为解析会发出http请求： GET /:/124e51f385854b22a66bdc63619a6b0f 404 in 186ms
  // const marked = require('marked');   // 和最上面的 import 功能一样。
  // const myRender = new marked.Renderer();
  // // myRender.image = () => {
  // //   return "。[不解析图片]。";
  // // };

  // myRender.image = function(href, title, text) {
  //   return "不解析图片";
  // };


  // 创建一个新的渲染器实例
  const renderer = new marked.Renderer();

  // 重写 image 方法，这里我们让它返回一个空字符串，表示不做任何处理
  renderer.image = function({href, title, text}) {
      // 返回空字符串或其他你想要的内容，比如 '[Image]'
      return '。不解析图片。';
  };

  // const mdhtml = marked(mdtext);
  // const mdhtml = marked.parse(mdtext, renderer);    // md, 这名字必须这个艹。
  const t2: MarkedOptions = {
    renderer: renderer,
  };
  const mdhtml = marked.parse(String(mdtext), t2);  // 加上 String() 也可以了。 这个 marked 是 js吗？  js ts html 各1/3
  // marked.use({renderer});
  // const mdhtml = marked.parse(String(mdtext)); // marked(): input parameter is of type [object Object], string expected . 形参类型都写了 string了，还说是object。。 加上 String() 就可以。 
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: mdhtml}} />
    </div>
  )
}

// function MarkdownRenderer() {
//   const markdownText = `
// # Hello, Markdown in React!

// This is a **bold** text and this is *italic*.

// ## Features
// - Item 1
// - Item 2
// - Item 3

// > This is a quote.

// \`\`\`js
// function hello() {
//   console.log("Hello from code block!");
// }
// \`\`\`
//   `;

//   // 使用 marked 将 Markdown 转换为 HTML 字符串
//   const htmlContent = marked(markdownText);

//   return (
//     <div>
//       <h2>Rendered Markdown:</h2>
//       {/* 使用 dangerouslySetInnerHTML 来插入 HTML */}
//       <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//     </div>
//   );
// }


//...
interface Meili_Idx {
  uid: string,
}
interface Meili_Idx_Resp {
  results: Meili_Idx[],
}


function DropDown_Index(setIndex: any) {
  const handleSelect = (event: any) => {
    // console.log(event.target.value);
    setIndex(event.target.value);
  }

  // const idx_arr = ["mymd", 'not_index', 'test2222'];
  // const [idx_arr, setIdx_arr] = useState([]);
  const [idx_Resp, setIdx_Resp] = useState<Meili_Idx_Resp>({results:[]});   // ..应该不需要 描述 idx 的了吧， 已经有类型object了啊。  看了下，要用 Interface 描述。 // 应该是 idx_result, 不是数组，数组是一个属性
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchIdx_arr = async() => {
      try {
        setLoading(true);
        const resp = await fetch("http://localhost:7111/indexes", {
          headers: {
            'Authorization': `Bearer mymeilisearch7111`
          }
        });
        if (!resp.ok) {
          throw new Error(`http error, status: ${resp.status}`);  // `wocao`
        }
        const data = await resp.json();
        // console.log(data);
        setIdx_Resp(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchIdx_arr();
  }, []);
  if (loading) return <div>loading...</div>;
  if (error) return <div>ErroR: {error}</div>;
  return (
    <div>
      <select id="select_idx" onChange={handleSelect}>
        {idx_Resp.results.map((idx: Meili_Idx, i: number) => (
          <option key={i} value={idx.uid}>{idx.uid}</option>
        ))}
        {/* <option key="111111" value="bomb">bomb</option> */}
      </select>
    </div>
  )
}

function Fetch_MeiliDoc() {

}


// ok    .. idx.uid is mymd....
// export default 
// function Home2() {
//   const [idxs, setIdxs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchIdxs = async() => {
//       try {
//         setLoading(true);
//         const resp = await fetch("http://localhost:7111/indexes", {
//           headers: {
//             'Authorization': `Bearer mymeilisearch7111`
//           }
//         });

//         if (!resp.ok) {
//           throw new Error(`http error, status: ${resp.status}`);  // `wocao`
//         }
//         const data = await resp.json();
//         // console.log(data);  // F12 - Console
//         setIdxs(data);
//       } catch(err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchIdxs();
//   }, []);

//   if (loading) return <div>loading...</div>;
//   if (error) return <div>ErroR: {error}</div>;
//   return (
//       <div>
//         <h2>cknn</h2>
//         <ul>
//           {idxs.results.map(idx => (
//             <li key={idx.primaryKey}>{idx.uid}</li>
//           ))}
//         </ul>
//       </div>
//   );
// }


interface InputLineParam {
  setQuery: React.Dispatch<React.SetStateAction<string>>,  // 直接复制 vscode 推导的 类型。
  q: string,
  setPage: React.Dispatch<React.SetStateAction<number>>,
};

// function InputLine(setQuery: any, q: string, setPage: any) {   // 组件不能这样写。。要用原来的 {} ................................
function InputLine({setQuery, q, setPage}: InputLineParam) {  // 但是 不能写类型
  // const handleChange = (e) => {
  //   // console.log(e.target.value);
  //   setQuery(e.target.value);
  // }
  
  const [inputTemp, setInputTemp] = useState("");
  const handleChange = (e: any) =>  {
    setInputTemp(e.target.value);
  }

  useEffect(() => {
    if (!inputTemp.trim()) {   // 发出请求，页面刷新后，input框被清空，2s后触发setQuery，导致 query修改，导致再次发出请求，刷新页面，所以 这里干脆 忽略 空字符串。 标准做法是 localStorage， 来保持 输入框中的值。
      return;
    }
    const timer = setTimeout(() => {
      // console.log(inputTemp);
      setQuery(inputTemp);
      localStorage.setItem("query", inputTemp);
      // setPage(1);
      localStorage.setItem("page", "1");
      // console.log(111);
      setPage(1);
    }, 2000);
    return () =>  {
      clearTimeout(timer);
    };
  }, [inputTemp]);

  // 防抖动，下面写上 value={q} 的话，要等2秒后 才执行，所以每次只能删除一个字符。 不要了。  需要用户记住，虽然输入框是 空的，但是 实际上 q依然是上次的值，没有被清空。。。

  return (
    <div>
      <input id="nn" type="text" onChange={handleChange} style={{width: '600px'}}/>
    </div>
  )
}

interface ChangePageParam {
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
}

// function ChangePage(page: number, setPage: any, setQuery: any) {
function ChangePage({page, setPage, setQuery}: ChangePageParam) {
  const nextPageBtnRef = useRef<HTMLButtonElement>(null);
  const prevPage = () => {
    // console.log(page)
    setPage(page - 1);
    localStorage.setItem("page", String((page) - 1));
    // console.log(222);
  }

  const nextPage = () => {
    // console.log(page);
    setPage(page + 1);
    localStorage.setItem("page", String((page) + 1));
    // console.log(333);
  }
  
  const randomPage = () => {
    // 最多1000条数据，所以 1-100之间
    // Math.random: [0, 1)
    const t2 = Math.floor(Math.random() * 100) + 1;
    setPage(t2);
    localStorage.setItem("page", String(t2));
    // setQuery("");
    // localStorage.setItem("query", "");   // 意义不大，内容大多数是 doc的，随机几次，大多数都是doc。 如果 把query置空，那么大多数是tine的 spring 的doc。。
  }

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nextPageBtnRef.current?.click();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  
  return (
    <div>
      <button style={{
        position: 'fixed',
        bottom: '120px',
        right: '20px',
        zIndex: 1000,
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }} onClick={randomPage}>随机100</button>

      <button style={{
        position: 'fixed',
        bottom: '70px',
        right: '20px',
        zIndex: 1000,
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }} onClick={prevPage}>上一页</button>
      <button id="ZXqwFG" style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        padding: '10px 15px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }} onClick={nextPage} ref={nextPageBtnRef}>下一页</button>
    </div>
  );
}


interface Meili_Doc {
  title: string,
  content: string,
}

interface Meili_Doc_Resp {
  hits: Meili_Doc[],
  page: number,
  totalPages: number,
}

export default function Home() {
  const [mdocs, setMdocs] = useState<Meili_Doc_Resp>({hits:[], page:-1, totalPages:-1});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // const obj = {hitsPerPage:5, page:1, q: ""};  // ..immutable..
  const [queryParam, setQueryParam] = useState({
    page: 1,
    hitsPerPage: 10,
    // sort: ["updated_time:asc"],  // meili index 没有设置 sortable属性。不过看起来，默认是 入库的顺序。
    q: "",
  })
  
  const [index, setIndex] = useState("mymd");

  // localStorage is not defined
  // const [query, setQuery] = useState(() => {
  //   return localStorage.getItem('query') || "";
  // });
  // const [page, setPage] = useState(() => {
  //   // console.log("get page");   // 这个方法只有 F5后才调用，后续的 点击 下一页，输入搜索参数，都不会再 调用该方法。 所以需要将 setPage 穿透到 输入搜索参数 那里。
  //   return Number(localStorage.getItem('page') || "1");
  // })

  const [query, setQuery] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("query");
    if (saved) {
      setQuery(saved);
    }
  }, []); // 空依赖：只在组件挂载后执行一次  ......

  const [page, setPage] = useState(1);
  useEffect(() => {
    const saved = localStorage.getItem("page");
    if (saved) {
      setPage(Number(saved));
    }
  });


  useEffect(() => {
    const fetchMdoc = async() => {
      try {
        // console.log(query);
        setLoading(true);

        const qp = {...queryParam, q: query, page: page};  // 不太行，下一页还得写？而且 信息 刷新后就 重置了，page 就丢失了。 对， 我不会 页面局部刷新。。。有点麻烦，感觉不如 做穿透，将 queryParam 作为 7112的 url参数，这样 就不会可以传递了。好像还是有点儿麻烦。 。。这个好像是2套逻辑，一个 是 监听修改，触发 重渲染。 一个是 通过 按钮点击，发出请求，重新渲染。 还是 存 localStorage吧。

        console.log(JSON.stringify(qp));

        const resp = await fetch(`http://localhost:7111/indexes/${index}/search`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer mymeilisearch7111`,
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify(qp),
        });

        if (!resp.ok) {
          // console.log(data);
          throw new Error(`http error, status: ${resp.status}  -----   ${JSON.stringify(await resp.json())}`);  // `xxxx`
        }
        // console.log(data);  // F12 - Console
        const data: Meili_Doc_Resp = await resp.json();
        setMdocs(data);
      } catch(err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // setQueryParam(queryParam => ({     // 始终慢一步，就是输入后，这里的query会是上一次输入的，而不是本次输入的。 因为 useState 是异步的，不会改变当前作用域的变量。
    //   ...queryParam,
    //   q: query
    // }));
    fetchMdoc();
  }, [query, page]);    // ==当query变化时，执行该方法。非常非常灵敏==

  if (loading) return <div>loading...</div>;
  if (error) return <div>ErroR: {error}</div>;
  return (
      <div>

        <div style={{margin: '20px', display: 'flex', flexWrap: 'nowrap', gap: '10px'}}>

        <DropDown_Index setIndex={setIndex}></DropDown_Index><InputLine setQuery={setQuery} q={query} setPage={setPage}></InputLine>
        
        </div>
        {/* <Home2></Home2> */}

        <ChangePage page={page} setPage={setPage} setQuery={setQuery}></ChangePage>

        <hr color="#770000"></hr>
        <div style={{marginLeft: 20}}>{query}: {mdocs.page}/{mdocs.totalPages}</div>
        <table style={{borderCollapse: 'collapse', border: '2px solid black', marginLeft: 20, marginRight: 5, textAlign: 'left', width: '100%'}}>
          <tbody>
          {mdocs.hits.map((mdoc: Meili_Doc, idx: number) => (
            <React.Fragment key={idx}>
            <tr>
              <th style={{border: '2px solid black', backgroundColor: '#AAAAAA', color: '#FFFFAA'}}>{mdoc.title}</th>
            </tr>
            <tr>
              <th style={{paddingLeft: '20px', border: '2px solid black'}}><RenderMarkdown mdtext={mdoc.content}></RenderMarkdown></th>
            </tr>
            </React.Fragment>
          ))}
          </tbody>
        </table>
        <br/><br/><br/><br/><br/>
      </div>
  );
}

