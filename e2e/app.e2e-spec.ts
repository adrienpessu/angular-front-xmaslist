import { AngularFrontXmaslistPage } from './app.po';

describe('angular-front-xmaslist App', function() {
  let page: AngularFrontXmaslistPage;

  beforeEach(() => {
    page = new AngularFrontXmaslistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
