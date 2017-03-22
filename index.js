//TODO: (lol) split these into components and import them in -- no reason the main js file should be concerned with all this

// These will show on first visit, but will be replaced with todos in localStorage if the user has set any before
var TODOS = [
  {done: true, info: 'Click X to remove the todo completely'},
  {done: true, info: 'Click checkbox to move item to other list'},
  {done: false, info: 'Finish this React project'}
];

var todoString = localStorage.getItem('todos');

if (todoString) {
  TODOS = JSON.parse(todoString);
}

class AddNewTodo extends React.Component {
  render() {
    return (
      <input type="text" onKeyPress={this.props.onEnter} className="addTodo" placeholder="Add a new item todo"></input>
    )
  }
}

class TodoItem extends React.Component {
  render() {
    return (
      <li className={this.props.done ? 'done' : 'todo'}>
        <input type="checkbox" onChange={this.props.onCheck.bind(this, this.props.info)}></input>{this.props.info}
        <span className="delete" onClick={this.props.onXClick.bind(this, this.props.info)}>X</span>
      </li>
    )
  }
}

class TodoList extends React.Component {
  render() {
    let list = [];
    this.props.todoList.forEach(function (todo) {
      list.push(<TodoItem info={todo.info} done={todo.done} key={todo.info} onCheck={this.props.onCheck} onXClick={this.props.onXClick}/>)
    }.bind(this));
    
    return (
      <div>
        <h3>Todo:</h3>
        <ul>{list}</ul>
        <AddNewTodo onEnter={this.props.onEnter}/>
      </div>
    )
  }
}

class DoneList extends React.Component {
  render() {
    let list = [];
    this.props.doneList.forEach(function (todo) {
      list.push(<TodoItem info={todo.info} done={todo.done} key={todo.info} onCheck={this.props.onCheck} onXClick={this.props.onXClick} />)
    }.bind(this));
    return (
      <div>
        <h3>Done:</h3>
        <ul>{list}</ul>
      </div>
    )
  }
}

class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.todos
    };
    
    this.handleCheck = this.handleCheck.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleXClick = this.handleXClick.bind(this);
  }
  
  handleCheck(info) {
    //there's probably a better way to do this...but I did it!
    // I'M REACTING!
    let newList = this.state.list.slice();
    let todo = newList.find(function (todos) {
      return todos.info === info;
    });
    
    todo.done = !todo.done;
    this.setState({
      list: newList  
    });
  }
  
  handleEnter(event) {
    if (event.key === 'Enter') {
      let newInfo = event.target.value;
      event.target.value = '';
      
      let newTodo = {done: false, info: newInfo};
      let newList = this.state.list.slice();
      newList.push(newTodo);
      
      this.setState({
        list: newList
      });

      localStorage.setItem('todos', JSON.stringify(newList));
    }
  }

  handleXClick(info) {
    let newList = this.state.list.slice();
    let todo = newList.find(function(todos) {
      return todos.info === info;
    });

    newList.splice(newList.indexOf(todo), 1);
    
    this.setState({
      list: newList
    });

    localStorage.setItem('todos', JSON.stringify(newList));
  }
  
  render() {
    let todos = this.state.list.filter(function (todo) {
      return !todo.done;
    });
    let dones = this.state.list.filter(function (todo) {
      return todo.done;
    });
    
    return (
      <div>
        <TodoList todoList={todos} onEnter={this.handleEnter} onCheck={this.handleCheck} onXClick={this.handleXClick} />
        <DoneList doneList={dones} onCheck={this.handleCheck} onXClick={this.handleXClick} />
      </div>
    )
  }
};

ReactDOM.render(
  <TodoListContainer todos={TODOS} />,
  document.getElementById('Reactodo')
);