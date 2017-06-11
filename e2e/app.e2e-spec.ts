import { RefactorPage } from './app.po';

describe('refactor App', () => {
  let page: RefactorPage;

  beforeEach(() => {
    page = new RefactorPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
