import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ToDo } from './todos';
import { ToDosService } from './todos.service';

describe('TodosService', () => {
  // A small collection of test todos
  const testTodos: ToDo[] = [
    {
      _id: '58895985a22c04e761776d54',
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: '58895985c1849992336c219b',
      owner: 'Fry',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: '58895985ae3b752b124e7663',
      owner: 'Fry',
      status: true,
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'homework'
    },
  ];
  let todosService: ToDosService;
  // These are used to mock the HTTP requests so that we (a) don't have to
  // have the server running and (b) we can check exactly which HTTP
  // requests were made to ensure that we're making the correct requests.
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todosService = new ToDosService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('getTodos()', () => {

    it('calls `api/todos` when `getTodos()` is called with no parameters', () => {
      // Assert that the  we get from this call to getTodos()
      // should be our set of test todos. Because we're subscribing
      // to the result of getTodos(), this won't actually get
      // checked until the mocked HTTP request 'returns' a response.
      // This happens when we call req.flush(testTodos) a few lines
      // down.
      todosService.getToDos().subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL.
      const req = httpTestingController.expectOne(todosService.todoUrl);
      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');
      // Check that the request had no query parameters.
      expect(req.request.params.keys().length).toBe(0);
      // Specify the content of the response to that request. This
      // triggers the subscribe above, which leads to that check
      // actually being performed.
      req.flush(testTodos);
    });

    describe('Calling getTodos() with parameters correctly forms the HTTP request', () => {
      /*
       * We really don't care what `getTodos()` returns in the cases
       * where the filtering is happening on the server. Since all the
       * filtering is happening on the server, `getTodos()` is really
       * just a "pass through" that returns whatever it receives, without
       * any "post processing" or manipulation. So the tests in this
       * `describe` block all confirm that the HTTP request is properly formed
       * and sent out in the world, but don't _really_ care about
       * what `getTodos()` returns as long as it's what the HTTP
       * request returns.
       *
       * So in each of these tests, we'll keep it simple and have
       * the (mocked) HTTP request return the entire list `testTodos`
       * even though in "real life" we would expect the server to
       * return return a filtered subset of the todos.
       */

      it('correctly calls api/todos with filter parameter true', () => {
        todosService.getToDos({ status: true }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todoUrl) && request.params.has('status')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was 'admin'
        expect(req.request.params.get('status')).toEqual('true');

        req.flush(testTodos);
      });

      it('correctly calls api/users with filter parameter \'category\'', () => {

        todosService.getToDos({ category: 'software design' }).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todoUrl) && request.params.has('category')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');

        // Check that the role parameter was 'admin'
        expect(req.request.params.get('category')).toEqual('software design');

        req.flush(testTodos);
      });

      it('correctly calls api/users with multiple filter parameters', () => {

        todosService.getToDos({ owner: 'Blanche', category: 'software design', status: true}).subscribe(
          todos => expect(todos).toBe(testTodos)
        );

        // Specify that (exactly) one request will be made to the specified URL with the role parameter.
        const req = httpTestingController.expectOne(
          (request) => request.url.startsWith(todosService.todoUrl)
            && request.params.has('owner') && request.params.has('category') && request.params.has('status')
        );

        // Check that the request made to that URL was a GET request.
        expect(req.request.method).toEqual('GET');
        console.log(req.request.params.get('status'));

        // Check that the role parameters are correct
        expect(req.request.params.get('owner')).toEqual('Blanche');
        expect(req.request.params.get('category')).toEqual('software design');
        expect(req.request.params.get('status')).toEqual('true');


        req.flush(testTodos);
      });
    });
  });

  describe('getTodosByID()', () => {
    it('calls api/todos/id with the correct ID', () => {
      // We're just picking a Todos "at random" from our little
      // set of Todos up at the top.
      const targetToDo: ToDo = testTodos[1];
      const targetId: string = targetToDo._id;

      todosService.getToDoById(targetId).subscribe(
        // This `expect` doesn't do a _whole_ lot.
        // Since the `targetTodos`
        // is what the mock `HttpClient` returns in the
        // `req.flush(targetTodos)` line below, this
        // really just confirms that `getTodosById()`
        // doesn't in some way modify the user it
        // gets back from the server.
        todos => expect(todos).toBe(targetToDo)
      );

      const expectedUrl: string = todosService.todoUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(targetToDo);
    });
  });

  describe('filterTodos()', () => {
    /*
     * Since `filterTodos` actually filters "locally" (in
     * Angular instead of on the server), we do want to
     * confirm that everything it returns has the desired
     * properties. Since this doesn't make a call to the server,
     * though, we don't have to use the mock HttpClient and
     * all those complications.
     */
    it('filters by owner', () => {
      const ownerName = 'Fry';
      const filteredTodos = todosService.filterToDos(testTodos, { owner: ownerName });

      expect(filteredTodos.length).toBe(2);

      filteredTodos.forEach(todos => {
        expect(todos.owner.indexOf(ownerName)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by category', () => {
      const todoCategory = 'software design';
      const filteredTodos = todosService.filterToDos(testTodos, { category: todoCategory });

      expect(filteredTodos.length).toBe(1);

      filteredTodos.forEach(todos => {
        expect(todos.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });

    it('filters by owner and category', () => {

      const ownerName = 'Fry';
      const todoCategory = 'video games';
      const filters = { owner: ownerName, category: todoCategory };
      const filteredTodos = todosService.filterToDos(testTodos, filters);

      expect(filteredTodos.length).toBe(1);
      // Every returned user should have _both_ these properties.
      filteredTodos.forEach(todos => {
        expect(todos.owner.indexOf(ownerName)).toBeGreaterThanOrEqual(0);
        expect(todos.category.indexOf(todoCategory)).toBeGreaterThanOrEqual(0);
      });
    });
  });
});
