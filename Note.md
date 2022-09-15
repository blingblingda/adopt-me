## JS Tools
1. src文件夹下有index.html, App.js, style.css. html中需要引入样式
2. 初始化文件夹：npm init -y
3. Prettier
   1) 可以使用npx prettier src/App.js --write 快速对单个文件格式化. 需要make config,新建文件.prettierrc, default setting的话直接输入{}即可。
   2) 安装vscode插件"Prettier-Code formatter"，vscode setting 勾选 editor:Format On Save和Require Config
   3) npm安装prettier：npm i -D prettier
   4) 在package.json里的scripts增加 "format": "prettier --write \"src/**/*.{js,jsx}\"", 这样npm run format就可以直接格式化
4. ESLint
   1) npm安装ESLint: npm i -D eslint@8.8.0 eslint-config-prettier@8.3.0
   2) 在package.json里的scripts增加 "lint": "eslint \"src/**/*.{js,jsx}\" --quiet", 这样npm run lint可以检查语法错误
   3) 设置：新建.eslintrc.json，复制内容
   ```
      {
         "extends": [
            "eslint:recommended",
            "prettier"
         ],
         "plugins": [],
         "parserOptions": {
            "ecmaVersion": 2022,
            "sourceType": "module",
            "ecmaFeatures": {
               "jsx": true
            }
         },
         "env": {
            "es6": true,
            "browser": true,
            "node": true
         }
      }
   ```
   4) 也可以安装vscode插件"ESLint"
5. Git
   1) git init 可以创建git
   2) 新建文件.gitignore 存放不上传的东西例如modules，一般写这些
   ```
   node_modules
   .parcel-cache/
   dist/
   .env
   .DS_Store
   coverage/
   .vscode/
   ```
6. Parcel （替代webpac，用于打包并run一个本地server即脚手架中的npm start命令）
   1）安装：npm i -D parcel
   2) scripts增加 "dev": "parcel src/index.html"，之后npm run dev会新增dist文件夹
7. 安装react和react-dom：npm i react@17.0.2 react-dom@17.0.2
8. Browserslist: 在package.json中增加
   ```
     "browserslist": [
      "last 2 Chrome versions"
   ]
   ```

## Core React Concepts - 实现搜索/展示功能
1. index.html 中
```
     <div id="root">not rendered</div>
      <script src="https://unpkg.com/react@17.0.2/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js"></script>
      <script type="module" src="./App.js"></script>
```
2. App中给Pet传递3个参数，在Pet中使用props接收并return JSX进行展示
3. ESLint无法识别JSX，需要configure ESLint with JSX
   1) 安装plugin： npm install -D eslint-plugin-import@2.25.4 eslint-plugin-jsx-a11y@6.5.1 eslint-plugin-react@7.28.0 eslint-plugin-react-hooks@4.3.0
   2) 把4个plugin配置到.eslintrc.json的extends和plugins，并配置rules和settings
   ```
   "extends": [
   "plugin:import/errors",
   "plugin:react/recommended",
   "plugin:jsx-a11y/recommended",
   "plugin:react-hooks/recommended"
   ],
   "rules": {
   "react/prop-types": 0,
   "react/react-in-jsx-scope": 0
   },
   "plugins": ["react", "import", "jsx-a11y", "react-hooks"],

   "settings": {
   "react": {
      "version": "detect"
     }
   }
    ```
4. 新建SearchParams components, 设置Location搜索栏。并引入App.js
   1) 给最外层div添加className方便设置css
   2) 因为是搜索栏，所以整体包裹在form里面方便发送数据
   3）上label下button， input需要给id, value默认显示值，placeholder标记性质
   4) 引入useState给function components设置state:
      1) location，initial state为""(默认显示placeholder内容)
      2) input中设置onChange：anytime a change event happens on this particular input, it's gonna call this inside function ``e => setLocation(e.target.value)``; then it's going to call setLocation, then the location in state will be updated to e.target.value, and rerender with the new state.
      3) setXxx is a state updater，一旦调用就会更新相应属性的state，然后重新render
   5)设置animal下拉选择框
      1) 外面设置一组假数据源 ``const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];``
      2) useState设置animal的state，初始值为""
      3) 在平行于location的label的位置再设置一个animal label,里面包含下拉框select，里面包含选项option（使用map获取数据）[code参见04-hook]。遍历上方增加一个option单标签使默认选项为空白。
      4) 由于每一次onChange animal之后Breed的state也需要初始化，因此animal里面的onChange需要带上updateBreed
      5)增加onBlur的原因是in case onChange无法触发的情况
   6)设置breed下拉选项
      1) 如果breeds没有内容，则disbaled掉这个select
      2) 上面设置一个空数组占位
      3) useState设置breed的state，初始值为""
      4) 仿照animal步骤即可,不过这里onChange和onBlur不需要带着animal
5. 设置钩子函数，获取后端信息列表
   1) 需求：after first render, 拿到pets的数据(调useEffect，[]为空)
   2) useState设置pets的state，初始值为[]
   3) 使用useEffect在第一次render之后调用requestPets function
   4) 使用async function+ await fetch 拿到response数据，再用await把res转换成json格式，然后使用setPets把pets的state更新为json里面的pets内容。（每一步不知道拿个啥的话就csl看一下）
   5) 在平行于form的下面直接遍历每一个pet，转化为<PET/>component的内容，注意需要传参数过去
   6) fetch发送请求的地址里面携带的animal就是目前最新的animal state，这里运用了closure概念，让里面的元素可以用外面的值
   7) useEffect里面的函数不能是async function所以单独写在了外面
   8) 第一次render后，因为async function的调用，更新了pets的state，所以又render了一遍
6. custom Hooks：需求：we can get a breed list back from API if we give it an animal
   1) 自定义hook是在官方hook的基础上的，所以引入useState和useEffect
   2) 设置一个localCache缓存,生产环境中应该是一个缓存池,这里用{}暂替
   3) 两个state：breedList收取品种数据，status监控状态
   4) useEffect设置钩子：
      1) 如果没有这个animal，则breedList为[]
      2) 如果localCache有数据，则breedList为localCache数据
      3) 否则调requestBreedList函数获取数据
      4) 设置 requestBreedList async function获取数据
         1) 每次获取数据时先清空breadList的state
         2) 让Status的state为”loading“
         3) 用promise+ await fetch从API取到需要数据
         4) 拿到json格式数据里面的breedsdata存入本地缓存的animal属性
         5) 更新breedList的State为本地缓存
         6) 更新status的state为”loaded“
      5) dependencies: animal，animal每次update就执行钩子。keeping track of life whenever animal changes, we request list (state tracking)
   5) return breedList和status
   6) 回到SearchParams组件，最上面的breeds数组可以换成自定义钩子并给传一个animal参数。
7. handling user Input
   1) form是包裹着label选项框和button提交按钮的
   2) 给form身上增加一个onSubmit属性，通过e获取到用户选择的所有内容&点击button的动作
   3) e.preventDefault() 阻止自动跳转（自刷新）
   4) 调用async function 会自动把用户输入的内容匹配进req中，发送请求，这样返回并渲染的就是客户需要的这部分数据了。
8. 抽出Results component，展示信息的部分可以单独一个component
   1) 新建 Results, 由于这个组件需要使用Pet展示具体格式，所以引入Pet组件
   2) 接到SearchParams传过来的pets，从params里拿到pets数据
   3) return一个判断，收到的pets没有东西吗？是的话渲染一句话，不是的话遍历pets里的所有pet并使用Pet组件按格式逐一渲染，调用Pet组件时需要把相应的属性传过去
9. Styling the Pet Component
   1) 从results接收props过来并直接destructuring
   2) 设置图片来源hero: 如果后端没有返回图片，则给hero一个默认图片地址。如果返回有图片，则取第一张。
   3) 展示的每一条内容都需要可点击，因此return的样式的最外层应该是一个a tag。里面第一个div显示图片，第二个div显示info。分别起好className
10. StrictMode
   1) 在JS文件的根目录导入{StrictMode} from 'react'
   2) 把整个return里面包裹起来就会触发strict mode
11. 打包上线 building for production - 数据传输会更快
   1) 因为有parcel了也安装了react，所以index.html不需要引入在线的react，删掉
   2) npx parcel build src/index.html
   3) npx serve dist (此处可以自动安装serve)

## React Capabilities - 实现路由跳转功能
1. Why a client side router: SPA - write a single page application. this allows you to basically have a user land on a page,and then when they navigate from page to page on your website they're not actually making a full request to your server, they're actually just routing to a different page inside of your JavaScript application.
2. 安装router: npm i react-router-dom@6.2.1
3. 设置Route规则
   1) 在App.js（JS根目录)引入{BrowserRouter, Routes, Route}
   2) BrowserRouter标签包裹所有标签内容
   3) 上面header显示后，下面内容整体由Routes显示，Routes包裹Route以匹配地址显示相应的component。 Route中包括path和element属性，单标签。
      1) Route1：用户如果请求地址"/details/:id"（6版本中只写根目录后面的path即可）,返回details组件
      2) Route2：用户如果请求主页，返回SearchParams组件
4. 设置Link需求。需要实现：点击相应pet后调取显示相应details组件。
   1) 因为是点击pet这个link，所以在Pet组件中把整个a标签改为Link标签，发送请求后（携带params参数），触发App.js里相应的Route规则（需要用占位：id等接收相应参数）从而调取相应的组件
   2) 此时参数已经传入Details中，Details使用useParams接收并展示即可
      1) 可以先查看useParams()的内容，正确的应该是传参过来的一个对象
         ```
         const a = useParams()
         console.log(a);
         => {id: '1'}
         ```
   3) ‘Adopt Me’作为header需要可以点击去往home page（根目录）。
      1) 需要在App.js中引入Link，并把logo改造为Link标签

## Class Components
1. 用Class写Details Component，引入Component，并建立rcc
2. 默认class会先调用
```
    constructor(props) {
        super(props)
        
        this.state = {loading:true}
    }
```
不过可以简写，直接设置loading的state，起始值为true
3. class必有render，先判断loading状态如果是true则渲染loading...这句话
4. 从this.state中解构出animal, breed, city, state, description, name； 然后return 显示的html格式和内容
5. 使用componentDidMount钩子在渲染后立刻请求相应pet的id的json格式数据，并使用setState更新状态，方便下面render渲染
   1) 可以分开更新两次状态，合起来写会更好
   ```
   this.setState({loading: false}) //把loading的state改成false
   this.setState(json.pet[0]) //把请求回来的json数据里面的第一个pet的所有数据放进state（下面return的时候就可以通过destructuring调取并展示了）
   ```
6. 需要拿到用户点击的pet的id，only way is get it from router
   1) 在Details外面包裹一个function components: WrappedDetails
   2) 这里接收到传递的数据后，传递给子组件Details
   3) 最后整体暴露的是WrappedDetails
7. 如果想要不写constructor，需要Parcel transform the code,且需要下载babel的一个plugin (parcel已经内置babel了，这里只是装个plugin)
   1) npm i -D @babel/plugin-proposal-class-properties@7.16.7
   2) 新建.babelrc设置文件 (is a contains like a detector to form your code from the futuristic JS to the past JS.)
   ```
   {
    "plugins":["@babel/plugin-proposal-class-properties"]
   }
   ```
   3) 组件中可以直接写state啦
8. 在Details对应的pet插入图片，且可以通过点选小图片展示成大图片
   1) 新建Carousel的rcc
   2) state和static的区别：state是每一个instance有一个自己的state，而static是所有instance通用的一般用于设置默认属性 (this is now an instance variable of this new Carousel, whereas the other is belongs to all carousels)
      ```
      const x = new Carousel ()
      x.state.active
      Carousel.defaultProps
      ```
   3) default的images地址直接放进array这样后面就不用判断了
   4) 从state里拿出active，从props父亲那里拿到images
   5) return显示的html格式和内容（a bit of markup)
      1) 大盒子叫carousel
      2) 里面先放一个img，来源就是目前active的那个images
      3) 下面放一个盒子叫carousel-smaller，里面用map遍历展示所有images，每个img需要有key,src,className,alt
   6) 回到Details中，接到images并传给Carousel.
9. 给Carousel里小图片add an EventListener 点击事件
   1) 给map出来的每个img增加onClick事件
   2) 定义handleIndexClick，用setState更改active的值为点击目标图片的index
   3) 在map的图片属性中增加data-index
   4) event.target: refer to whatever image you clicked on
      dataset: access whatever I put on the HTML data set
      index: whatever this is
      所以img增添的data-index属性会被event捕捉到，dataset对应data-，index对应index
   5) img里面的index是数字，但是e取到的index是字符串，因此大img的src的active是字符串。（可以在html中看到）在e前面+，就可以转换为数字

## Special Case React Tools
1. 需要给Details加error boundary 
   1) 新建ErrorBoundary.js ; Error Boundary 必须是class components
      1) 设置hasError的state，以及更改state的契机static
      2) 用componentDidCatch捕获error & info (lifecycle method)
      3) render：如果是true，展示一段话+link回主页/等5秒回主页。如果是false，正常渲染children的内容
   1) 需要用ErrorBoundary这个组件把需要查错的组件包裹起来。(it has to be outside of where you expect the errors to happen)因为Details组件中，最后就是用wrappedDetails包裹并暴露的，因此直接在wrappedDetails里面，Details外面包裹ErrorBoundary即可。如果没有Wrapped这一层，则需要创建一个。
   3) ErrorBoundary组件增加componentDidUpdate, every time that the state or props gets updated, this will get invoked.
      1) 如果有问题，5000后开启定时器，修改redirect的state为true
      2) render：增加一个判断条件，如果redirect是true，则设置默认跳转 Navigate 到主页
2. Context 祖组件App给下面所有的组件传递themeColor属性 (修改button颜色)
   1) 新建ThemeContext.js，引入createContext。mimicking a useState hook，创建一个xxContext容器，给一个default color，后面跟一个空箭头函数。暴露。
   2) 到需要传输东西的祖组件App，引入xxContext
      1) 使用useState给一个default变量 定义theme
      2) 用ThemeContext.Provider把整个祖组件包裹，传出去的value就是刚才的theme。可以同时用多组provider
   3) 到需要接收的后代组件SearchParams（button在这里）
      1) 引入useContext和ThemeContext
      2) 用useContext拿出ThemeContext里面的内容（已经被provider传入了具体数据）赋值给theme
      3) 在需要改颜色的button处，直接用行内样式，把bgc设置为theme
   4) 到另一个有按钮的后代组件Details中，用Consumer修改theme
      1) 引入ThemeContext
      2) 用ThemeContext.Consumer包裹button，里面是一个箭头函数，value接收的是theme，然后把button的行内样式写成theme
   5) 在SearchParams里面增加一个改变颜色的下拉选项框，点击option可以setTheme，从而更改所有按钮颜色
      1) 在breed label下面新建一个theme label
      2) 标题Theme，设置一个select（属性有：value，onChange，onBlur，后两个是通过setTheme修改theme的state），下面4个option设置value（与select里面setTheme的value呼应）
3. portals/modals & refs 需求：在details页面点击adopt按钮后，出div(覆盖网页）：点击yes按钮跳转网页，点击no按钮关闭div
   1) 由于我们并不希望调portal这个组件的时候改写网页，所以这个组件不能再放在html里的root标签下，因此在root div上面放一个modal div，后续内容均生成在modal div里，就不会影响之前的网页了。
   2) 建立Modal.js，引入useEffect, useRef, createPortal, 然后rfc
   3) useRef给一个default值null, 赋值给elementRef（container）。A ref is I have one value that I need to refer to the exact same thing across all renders. 对于useState来说，每一个render都有自己的state，但是对于useRef来说，所有render都refer to exactly the same thing.
   4) elRef里只有一个属性可以set: current，elRef is a frozen object。如果是空的则create一个div放里面
   5) 设置useEffect钩子
      1) 拿到modal节点
      2) 在里面追加刚才生成的div，即container
      3) 由于只有首次渲染才需要，所以dependencies是[]
      4) 最后需要把我们生成的那个div unmount，因此这里返回值是一个clean up function，把modalRoot的elRef.current remove掉
   6) return渲染 createPortal，第一个参数是渲染的内容即Modal的children，第二个参数是container即elRef.current   
   
   7) 在Details页面显示，因此回到Details组件，引入Modal组件
      1) 在Details组件的state里，增加一个showModal默认false来控制是否显示Modal的div
      2) 到渲染的render里面，平行于p tag，写一个div，里面是要展示的内容markup
         1) 上面是h1文字，下面是一个div，里面放着两个按钮
         2) 由于第一个按钮是跳转网页，所以可以直接写成一个a标签
         3) 第二个是关闭按钮，因此写成button。onClick后会触发改变showModal 的 state的函数toggleModal
         4) * 注意，会更改showModal状态的不仅有弹框里面的no按钮，还有外面的adopt按钮，所以需要在adopt的button上也增加onClick事件触发toggleModal function
      3) 到渲染的上面定义toggleModal, 把showModal的state更新为与目前相反的状态
      4) 渲染的内容应该放在Modal组件里面才能渲染到一个新的html页签里面,显示在details这个页面的cover上面,而不是真的只是出现在p的下面
      5) 什么时候显示这个组件，取决于showModal的状态，因此最外层要放判断showModal状态的三元表达式。if it's true, it's gonna use our modal component and it's gonna render everything that we put inside of modal. That's how we get 对话框 which is over everything.
      6) modal & root will be rendered in different places, despite the fact that the component is all living in one spot