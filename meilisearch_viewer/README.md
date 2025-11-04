
`npm run dev`

# 需求

meilisearch 自带的浏览器界面不好用。 不太适合我的数据。

所以准备自己写一个。

需求
- 页面主要显示 doc.content
- UI
  - 搜索框
  - 窗口缩放，主要是 整个屏幕， 左半个屏幕 的情况下， 是否不影响阅读效果
  - 显示
    - 如何显示 转义后的 markdown
    - 应该就显示： title，content，其他的没什么用。  id，dir 无意义， title中已经包含了 filename了，所以 文件名也不需要显示， 不关心 updatetime， size 的话，看的是 content，size 大或小 不关心。
      - 那就是 第一行 title，第二行 content。
      - 希望 title 顶格， content 右移一点点， 条与条之间也远一点点， 方便分辨。
        - 或者 title是 背景深红色， 前景 黄色。
        - 顶格 也得 距离 左侧 1-2cm
      - 进阶：
        - 加一个 按钮，点一下 就把 content 收起来，
        - 加一个按钮， 点一下 就通过 vscode 打开该文件， 不过好像不太行， 第一，浏览器 没有权限 调用 vscode， 第二， md好找， joplin的，你得 访问 joplin。
- 搜索
  - 不知道 meili 支持哪些 搜索功能， 现在想要的是 指定 搜索 的 列，但是似乎没有。
  - index的选择？

---


# do


curl -X POST 'localhost:7111/indexes/mymd/search' -H 'Content-Type: application/json' -H 'Authorization: Bearer mymeilisearch7111' --data-binary '{"hitsPerPage":10}'



## fetch
```ts
import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 获取数据 (GET 请求)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/users');
        
        // 检查响应状态
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 创建数据 (POST 请求)
  const createUser = async (userData) => {
    try {
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]); // 更新本地状态
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;

  return (
    <div>
      <h2>用户列表</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
```


## marked

`npm install marked`

```js
<!DOCTYPE html>
<html>
<head>
  <title>Markdown 示例</title>
</head>
<body>
  <div id="markdown-content"></div>

  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script>
    // Markdown 字符串
    const markdownString = `
# 这是一个标题

这是一个段落，**加粗** 和 *斜体*。

- 列表项 1
- 列表项 2

[链接示例](https://example.com)
    `;

    // 转换为 HTML
    const html = marked.parse(markdownString);

    // 插入到页面
    document.getElementById('markdown-content').innerHTML = html;
  </script>
</body>
</html>
```

```ts
import React from 'react';
import { marked } from 'marked'; // 从 marked 导入

function MarkdownRenderer() {
  const markdownText = `
# Hello, Markdown in React!

This is a **bold** text and this is *italic*.

## Features
- Item 1
- Item 2
- Item 3

> This is a quote.

\`\`\`js
function hello() {
  console.log("Hello from code block!");
}
\`\`\`
  `;

  // 使用 marked 将 Markdown 转换为 HTML 字符串
  const htmlContent = marked(markdownText);

  return (
    <div>
      <h2>Rendered Markdown:</h2>
      {/* 使用 dangerouslySetInnerHTML 来插入 HTML */}
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}

export default MarkdownRenderer;
```

# package

`npm run build`

。。打包好严格。。

`CI=false npm run build`
`SKIP_PREFLIGHT_CHECK=true npm run build`  没用。。

---

费了老大劲，结果打包到  .next 了，  感觉是 里面的 build 文件夹， 其他的应该 无所谓的。

但是 build 下是 chunks，chunks 里是 10个文件， map 和 js 文件。 正常的。 但是看这几个文件，分不出哪个是 main。

`next export`


..删了 默认的app文件夹，再次 npm run build， 这次 没有 build 文件夹了。

现在 直接 IP+端口 就可以了，不需要 path


`A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. `

说 layout.tsx 的 `<html lang="en">`， 把lang 删了还是， 看来就是 react 会在 html 中自动添加 一些属性，导致 这个问题。
```
  <html
-   data-darkreader-mode="dynamic"
-   data-darkreader-scheme="dark"
  >
```
。。不是 react的，是 dark reader 的。
。那就是 我没有 黑暗模式的 样式 导致的？  那没办法。


还得安装 next。。还得下个nginx。

ri. 这next不是 dnf 的， `npm list next` 是有 next 的啊。 
但是
- `npx next export`, 报错： `next export` has been removed in favor of 'output: export' in next.config.js.
- `npm next export`, 报错： Unknown command: "next"

`npx export`， 无意试了下，好像可以。 需要装一个 export包。0.1.337。。。 不是用来 导出的， 不知道用来干嘛的。

`npm install next`  没用

...

## success

`next export` has been removed in favor of 'output: export' in next.config.js
问上面这句，告诉我 node13 弃用 next export 了。

1. 修改 next.config.ts, 在 nextConfig 中增加 `output: 'export',`
2. `npm run build` ，就可以看到 out 文件夹了。

---

nginx 有点麻烦， 主要是 SeLinux 搞事。

`sudo systemctl start nginx`

- `sudo cp -r out/* /var/www/html/`   ，当然 目录要新建下
- 修改 nginx 配置， server 的 root 改成 /var/www/html
- Selinux 的话： 
  ```sh
  sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/html(/.*)?"
  sudo restorecon -R /var/www/html
  ```

- 虽然 也 将 /var/www/html， chown -R 为 nginx:nginx，chmod -R 755。 但估计 原先的 没有问题。 原先是 全都755， owner 是 root。 我vscode可以打开 这里的文件的，所以 nginx 也可以的。


---

# 缺

- 图片解析
- 点击按钮，在vscode中打开文件

- 感觉需要一个星标，标记整个文件，  sort

- 搜索 似乎最多1000条数据， 这个要 启动meili时， --max-offset-limit=5000 修改。

- random，需要筛选一些 值得random的 文件。 现在 随机来随机去，都是一些 doc 。。



---




---


