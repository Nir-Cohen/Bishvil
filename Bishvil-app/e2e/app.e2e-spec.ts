import { BishvilAppPage } from './app.po';

describe('bishvil-app App', function() {
  let page: BishvilAppPage;

  beforeEach(() => {
    page = new BishvilAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
