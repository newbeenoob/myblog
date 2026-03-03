#!/bin/bash

# 检查 3000 端口是否被占用
if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
    echo "3000 端口已被占用，正在清理..."
    # 杀死占用 3000 端口的进程
    lsof -ti:3000 | xargs kill -9
    echo "3000 端口已清理"
fi

# 构建项目
echo "正在构建项目..."
npm run build

# 启动项目
echo "正在启动项目..."
npm run dev