import React from "react";

class Header extends React.Component {
    render(){
        const {totalTask, completedTask} = this.props
        return (
            <header className="completedTask">
                <label>{completedTask} tâches réalisées
                    sur {totalTask}.</label> <br></br>
            </header>
        )
    }
}

export default Header;