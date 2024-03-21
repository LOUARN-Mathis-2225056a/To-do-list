import React from "react";
import {Box, Button, Modal} from "@mui/material";

class Footer extends React.Component {
    render(){
        const {taskToSearch, filterTask,openModal,open,closeModal,style,addTaskTitle,addTask} = this.props
        return (
            <footer>
                <div className="searchTask">
                    <input value={taskToSearch} onChange={filterTask} placeholder="chercher une tache"/>
                </div>
                <div>
                    <Button onClick={openModal}>Ajouter une tache</Button>
                    <Modal
                        open={open}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >

                        <Box sx={style}>
                            <input id={"taskInput"} onChange={addTaskTitle} placeholder={"nom de la tache"}></input>
                            <button id={"addTaskButton"} onClick={addTask}>ajouter la tache</button>
                        </Box>
                    </Modal>
                </div>
            </footer>
        )
    }
}

export default Footer;