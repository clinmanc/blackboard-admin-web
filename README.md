# BlackboardAdminWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# 生产部署
## 1. 安装Apache服务器
修改`/etc/httpd/conf/httpd.conf`文件中的如下配置:

```
Listen 80
```
端口自定

```xml
<Directory "/var/www/html">
    AllowOverride None
    # Allow open access:
    Require all granted
</Directory>
```
`None`修改为`All`

## 2. 部署命令
```bash
sudo rm -rf /var/www/html/*
sudo cp -r /home/用户名/dist/*  /var/www/html
```
目录按照实际修改
