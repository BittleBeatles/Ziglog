describe('google login', () => {
  it('구글 로그인 버튼 클릭', () => {
    cy.visit('/');
    cy.contains('button', '로그인').click();
    cy.get('img[alt="Google 로그인"]').click();
  });
});
