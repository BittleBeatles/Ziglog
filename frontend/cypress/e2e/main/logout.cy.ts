describe('logOut', () => {
  it('로그아웃', () => {
    cy.visit('/');
    cy.contains('button', '로그아웃').click();
  });
});
