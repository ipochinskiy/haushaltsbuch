import { HaushaltsbuchPage } from './app.po';

describe('haushaltsbuch App', () => {
  let page: HaushaltsbuchPage;

  beforeEach(() => {
    page = new HaushaltsbuchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
