describe('search', () => {
  it('노트 검색', () => {
    cy.visit('/search');
    cy.get('input').type('노트');
    cy.contains('14번노트').click();
  });
});
