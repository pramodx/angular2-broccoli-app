import { Angular2BroccoliAppPage } from './app.po';

describe('angular2-broccoli-app App', function() {
  let page: Angular2BroccoliAppPage;

  beforeEach(() => {
    page = new Angular2BroccoliAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
