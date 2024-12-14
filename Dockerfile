# 使用官方的 Nginx 镜像作为基础镜像
FROM nginx:alpine

# 删除默认的 Nginx 配置文件
RUN rm -rf /usr/share/nginx/html/*

# 将 Vite 打包后的文件复制到 Nginx 的 html 目录
COPY dist /usr/share/nginx/html

# 将 Nginx 配置文件替换为自定义配置（可选）
# COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口 80
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
