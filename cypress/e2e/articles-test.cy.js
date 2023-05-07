describe('Article collection application', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/index.html')
    })
  
    it('displays the main heading', () => {
      cy.contains('h1', 'My Article Collection').should('be.visible')
    })
  
    it('has three radio buttons and "All" is selected by default', () => {
      cy.get('input[type=radio]').should('have.length', 3)
      cy.get('input[type=radio][value=all]').should('be.checked')
    })
 
    it('displays only published articles when "Published" radio button is selected', () => {
        // Check if the "All" radio button is checked, and if so, click the "Published" radio button
        cy.get('input[type=radio][value=all]').should('be.checked')
        cy.get('input[type=radio][value=published]').click()
        
        // Wait for the articles to load
        cy.get('.article')
        
        // Loop through each article and check that it is published
        cy.get('.article').each(($el) => {
          const published = $el.find('p').text()
          console.log('published value:', published);
          expect(published).to.equal('Published: Yes')
        })
        
        // Click the "Unpublished" radio button and check that no articles are displayed
        cy.get('input[type=radio][value=unpublished]').click()
        cy.get('.article').should('not.exist')
      })
  
    it('displays unpublished articles when "Unpublished" radio button is selected', () => {
      cy.get('input[type=radio][value=unpublished]').check()
      cy.get('.article').each(($el) => {
        const published = $el.find('.article-published').text()
        expect(published).to.equal('unpublished')
      })
    })

    it('expands an article when the expand button is clicked', () => {
      cy.get('.expand-btn').first().click()
      cy.wait(1000); // wait for 1 second
      cy.get('.article .article-body').first().should('be.visible')
    })
  
    it('collapses an article when the collapse button is clicked', () => {
      cy.get('.expand-btn').first().click()
      cy.get('.article-body').first().should('be.visible')
      cy.get('.expand-btn').first().click()
      cy.get('.article .article-body').first().should('not.be.visible')
    })
  })
  