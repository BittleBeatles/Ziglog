describe('kakao login', () => {
  it('카카오 로그인 버튼 클릭', () => {
    cy.visit('/');
    cy.contains('button', '로그인').click();
    cy.get('img[alt="카카오 로그인"]').click();
  });
});
