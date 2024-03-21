import './App.css';
import React from "react";
import Header from './Header'
import Footer from './Footer'

class TodoApp extends React.Component {
    style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '555555FF',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    openModal = () => this.setState({open: true});
    closeModal = () => this.setState({open: false});
    constructor(props) {
        super(props)

        this.state = {
            items: [
                { title: "Exemple de tache simple", isChecked: false },
                { title: "Exemple de tache cochée", isChecked: true }
            ],
            inputTask: "Une tâche",
            taskToSearch: "",
            open: false
        }
        this.addTask = this.addTask.bind(this);
        this.addTaskTitle = this.addTaskTitle.bind(this);
        this.filterTask = this.filterTask.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    render() {
        const filteredItems = this.state.items.filter(item =>
            item.title.toLowerCase().includes(this.state.taskToSearch.toLowerCase()));

        return (
            <div>
                <Header totalTask = {this.state.items.length} completedTask={this.state.items.filter(item => item.isChecked === true).length}/>
                <div className="taskList">
                    <h2>Liste des taches</h2>
                    <ol>
                        {filteredItems.map((item, index) => (
                            <li key={index}>

                                <button className="delete" onClick={() => this.deleteATask(index)}>-</button>
                                <input type="checkbox" readOnly checked={item.isChecked}
                                       onChange={() => this.checkATask(index)}/>
                                <span className={item.isChecked ? "isChecked" : ""}>{item.title}</span>

                                <button className="order" onClick={() => this.moveItemUp(index)}>↑</button>
                                <button className="order" onClick={() => this.moveItemDown(index)}>↓</button>

                            </li>
                        ))}
                    </ol>
                </div>
                <Footer taskToSearch={this.state.taskToSearch}
                        filterTask={this.filterTask}
                        openModal={this.openModal}
                        open={this.state.open}
                        closeModal={this.closeModal}
                        style={this.style}
                        addTaskTitle={this.addTaskTitle}
                        addTask={this.addTask}/>
            </div>
        )
    }

    moveItemUp = (index) => {
        if (index > 0) {
            this.setState(prevState => {
                const newItems = [...prevState.items];
                const temp = newItems[index];
                newItems[index] = newItems[index - 1];
                newItems[index - 1] = temp;
                return {items: newItems };
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
                return {items: newItems };
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

export default TodoApp;
