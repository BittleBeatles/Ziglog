describe('sample', () => {
  it('지그재그 프로젝트 찾기', () => {
    cy.visit('/');

    cy.contains('지그재그 프로젝트입니다.');
  });
});
