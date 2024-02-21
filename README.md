#### 2. 项目的安装
   1. **配置npm**：项目运行需要电脑配置npm环境，可以通过命令行查看是否有输出npm的版本信息： 
      `npm -v` 
   2. **配置node**：在配置了npm环境后还需要配置node.js环境，可以通过命令行查看是否有输出node的版本信息：
      `node -v` 
   3. **初始化项目**：在配置好环境后，在终端进入项目目录，并执行：
      `yarn init -y`
   4. **安装依赖**：初始化项目后，同样在终端执行 
      `yarn add express ejs express-session fs multer multiparty mysql request session body-parser`
   5. 安装完成后即可运行项目