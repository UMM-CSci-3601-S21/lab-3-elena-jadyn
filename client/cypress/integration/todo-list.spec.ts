import { ToDoListPage } from '../support/todo-list.po';

const page = new ToDoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getToDoTitle().should('have.text', 'To Dos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for user 'Blanche'
    cy.get('#todos-owner-input').type('Blanche');
  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for category 'homework'
    cy.get('#todos-body-input').type('sunt');
  });

  it('Should type something partial in the body filter and check that it returned correct elements', () => {
    // Filter for categories that contain 'de'
    cy.get('#todos-body-input').type('in');
  });

});
