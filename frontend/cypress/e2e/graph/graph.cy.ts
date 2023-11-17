describe('그래프 페이지 이동', () => {
  it('SVG 그래프 클릭', () => {
    cy.visit(
      '/user-page/%EB%A7%9D%ED%82%A4%EC%95%84%EB%8B%88%EA%B3%A0%EB%8B%A4%EA%BC%AC%EB%A6%AC/read-note/14'
    );
    cy.get('svg.graphView_svg__ldl-scale').click();
  });
});
