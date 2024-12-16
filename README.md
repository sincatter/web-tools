# web-tools

## 概述
该仓库包含了一些常用的本地工具包
* a5toa4  
将A5的电子发票转换为A4尺寸的文件，每个页面放置两张发票，并可缩放大小

## 示例网站
[tools.sincatter.com](https://tools.sincatter.com/)

## 本地使用
```shell
git clone git@github.com:sincatter/web-tools.git
cd web-tools
npm install
# 调试
npm run dev
# 打包
npm run build
```
## docker部署
```shell
docker run -itd \
    --name web-tools \
    --hostname web-tools \
    -p 8382:80 \
    --restart always \
    sincatter/web-tools:latest
```