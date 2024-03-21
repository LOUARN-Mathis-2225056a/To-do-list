import './App.css';
import React from "react";



class TodoApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                { title: "Exemple de tache simple", isChecked: false },
                { title: "Exemple de tache cochée", isChecked: true }
            ],
            inputTask: "Une tâche",
            taskToSearch: ""
        }
        this.addTask = this.addTask.bind(this);
        this.addTaskTitle = this.addTaskTitle.bind(this);
        this.filterTask = this.filterTask.bind(this);
    }

    render() {
        const filteredItems = this.state.items.filter(item =>
            item.title.toLowerCase().includes(this.state.taskToSearch.toLowerCase()));
        return (
            <div>
                <header className="completedTask">
                    <label className="blue">{this.state.items.filter(item => item.isChecked === true).length} tâches
                        réalisées
                        sur {this.state.items.length}.</label> <br></br>
                </header>
                <div className="taskList">
                    <h2>Liste des taches</h2>
                    <ol>
                        {filteredItems.map((item, index) => (
                            <li key={index}>

                                <button className="delete" onClick={() => this.deleteATask(index)}>-</button>
                                <input type="checkbox" readOnly checked={item.isChecked}
                                       onChange={() => this.checkATask(index)}/>
                                <span className={item.isChecked ? "isChecked" : ""}>{item.title}</span>

                                <button className="order" onClick={() => this.moveItemUp(index)}>Up</button>
                                <button className="order" onClick={() => this.moveItemDown(index)}>Down</button>

                            </li>
                        ))}
                    </ol>
                </div>
                <footer>
                    <div className="searchTask">
                        <input value={this.state.taskToSearch} onChange={this.filterTask} placeholder="chercher une tache"/>
                    </div>
                    <div className="addTask">
                        <input onChange={this.addTaskTitle}></input>
                        <button onClick={this.openModal}>ajouter une tache</button>
                    </div>
                </footer>

            </div>
        )
    }
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    moveItemUp = (index) => {
        if (index > 0) {
            this.setState(prevState => {
                const newItems = [...prevState.items];
                const temp = newItems[index];
                newItems[index] = newItems[index - 1];
                newItems[index - 1] = temp;
                return { items: newItems };
            });
        }
    }

    moveItemDown = (index) => {
        if (index < this.state.items.length - 1) {
            this.setState(prevState => {
                const newItems = [...prevState.items];
                const temp = newItems[index];
                newItems[index] = newItems[index + 1];
                newItems[index + 1] = temp;
                return { items: newItems };
            });
        }
    }

    addTaskTitle(event) {
        this.setState({inputTask: event.target.value});
    }

    checkATask(index) {
        const updatedItems = [...this.state.items];
        updatedItems[index].isChecked = !updatedItems[index].isChecked;
        this.setState({ items: updatedItems });
    }

    deleteATask(index) {
        if (window.confirm("Confirmer la suppression de la tache ?")) {
            const updatedItems = [...this.state.items];
            updatedItems.splice(index, 1);
            this.setState({ items: updatedItems });
        }
    }

    addTask() {
        this.setState(previousState => ({
            items : [...previousState.items,{title : this.state.inputTask, isChecked:false}]
        }));
    }

    filterTask(event){
        this.setState({ taskToSearch: event.target.value });
    }

}

function App() {
  return (
      <div className="App">
            <TodoApp />
      </div>
  );
}

export default App;
