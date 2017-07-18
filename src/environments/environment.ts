// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  noAuth: false,
  baseUrl: 'http://localhost:9124',
  url: 'http://localhost:9124/api/v1',
  authUrl: 'http://localhost:9124/api/v1',
  imgProxyUrl: 'http://localhost:9124/proxy/image',
  builtinImgUrl: 'http://www.xiaoheiban.cn/Public/banhui',
  fileUrl: 'http://testfile.xiaoheiban.cn',
  audioFileUrl: 'http://demo.xiaoheiban.cn/audio',
  announcementToken: '58d0f2720cf20bdd7d45e0b9'
};
