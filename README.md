### 项目拉取

1. 安装Git：[Git官网](https://git-scm.com/download/win)
2. 在文件夹下打开 **==Git Bash==** 程序
3. 输入 `git clone git@github.com:treehairs/Backend.git` 或者 `git clone https://github.com/treehairs/Backend.git`

***

### 配置环境

1. **配置npm**：项目运行需要电脑配置npm环境，可以通过命令行查看是否有输出npm的版本信息： 
`npm -v` 
2. **配置node**：在配置了npm环境后还需要配置node.js环境，可以通过命令行查看是否有输出node的版本信息：
`node -v` 
3. **初始化项目**：在配置好环境后，在终端进入项目目录，并执行：
`npm init -y`
4. **安装依赖**：初始化项目后，同样在终端执行 
`npm install express mysql body-parser`
5. 安装完成后即可运行项目

***

### 项目运行

1. 在终端打开项目根目录，并执行 `node server/app.js`，如果后台输出：服务器启动成功的信息，即代表服务器启动成功
