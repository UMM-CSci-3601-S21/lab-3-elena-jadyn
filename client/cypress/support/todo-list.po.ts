export class ToDoListPage {
  navigateTo() {
    return cy.visit('/todos');
  }

  getUrl() {
    return cy.url();
  }

  getToDoTitle() {
    return cy.get('.todos-list-title');
  }

  getToDoListItems() {
    return cy.get('.todo-nav-list .todo-list-item');
  }
}
