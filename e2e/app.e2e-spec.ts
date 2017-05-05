import { BlackboardAdminWebPage } from './app.po';

describe('blackboard-admin-web App', () => {
  let page: BlackboardAdminWebPage;

  beforeEach(() => {
    page = new BlackboardAdminWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
