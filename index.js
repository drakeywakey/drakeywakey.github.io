//TODO: (lol) split these into components and import them in -- no reason the main js file should be concerned with all this

var TODOS = [
  {done: true, info: 'be such a badass'},
  {done: false, info: 'do this React app'},
  {done: false, info: 'achieve one-ness'}
];

class AddNewTodo extends React.Component {
  render() {
    return (
      <input type="text" onKeyPress={this.props.onEnter}></input>
    )
  }
}

class TodoItem extends React.Component {
  render() {
    return (
      <li><input type="checkbox" onChange={this.props.onCheck.bind(this, this.props.info)}></input>{this.props.info}</li>
    )
  }
}

class TodoList extends React.Component {
  render() {
    let list = [];
    this.props.todoList.forEach(function (todo) {
      list.push(<TodoItem info={todo.info} key={todo.info} onCheck={this.props.onCheck} />)
    }.bind(this));
    
    return (
      <div>
        <h1>Todo:</h1>
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
      list.push(<TodoItem info={todo.info} key={todo.info} onCheck={this.props.onCheck} />)
    }.bind(this));
    return (
      <div>
        <h1>Done:</h1>
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
    }
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
        <TodoList todoList={todos} onEnter={this.handleEnter} onCheck={this.handleCheck} />
        <DoneList doneList={dones} onCheck={this.handleCheck} />
      </div>
    )
  }
};

ReactDOM.render(
  <TodoListContainer todos={TODOS} />,
  document.getElementById('Reactodo')
);