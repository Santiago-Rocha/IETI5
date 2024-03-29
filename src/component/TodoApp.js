import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import moment from "moment";
import React, { Component } from 'react';
import { TodoList } from "./TodoList";
import AddIcon from '@material-ui/icons/Add';
import { Fab } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';




export class TodoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [], description: '', status: '', dueDate: moment(), name: '', email: '', open: false,
            openFilter: false, filter: { name: '', status: '', dueDate: null }, filtering: { name: '', status: '', dueDate: null }
        };
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.hanldeNameResponsibleChange = this.hanldeNameResponsibleChange.bind(this);
        this.hanldeEmailResponsibleChange = this.hanldeEmailResponsibleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitFilter = this.handleSubmitFilter.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleCloseFilter = this.handleCloseFilter.bind(this);
        this.handleOpenFilter = this.handleOpenFilter.bind(this);
        this.handleNameFilterChange = this.handleNameFilterChange.bind(this);
        this.handleStatusFilterChange = this.handleStatusFilterChange.bind(this);
        this.handleDueDateFilterChange = this.handleDueDateFilterChange.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    

    render() {
        return (
            <div id="temp">
                <TodoList todoList={this.state.items} filter={this.state.filtering} />

                <Fab onClick={this.handleOpen} style={{ position: "absolute", right: "0px", bottom: "0", margin: "10px" }}>
                    <AddIcon></AddIcon>
                </Fab>
                <FilterListIcon onClick={this.handleOpenFilter} style={{position:"absolute",top:0, right:0, fill: "white"}}/>

                <Dialog onClose={this.handleCloseFilter} aria-labelledby="simple-dialog-title" open={this.state.openFilter}>
                    <form onSubmit={this.handleSubmitFilter} className="todo-form" style={{ width: "100%" }}>
                        <h3>Filter</h3>
                        <TextField
                            id="textFilter"
                            label="Name"
                            value={this.state.filter.name}
                            onChange={this.handleNameFilterChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="statusFilter"
                            label="Status"
                            value={this.state.filter.status}
                            onChange={this.handleStatusFilterChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="due-date"
                            label="Due Date"
                            type="date"
                            defaultValue={ this.state.filter.dueDate ? this.state.filter.dueDate.format('YYYY-MM-DD'): null}
                            onChange={this.handleDueDateFilterChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                            <br/><br/>
                        <Button variant="outlined" color="secondary" type="submit">
                            Apply
                        </Button>
                        <Button onClick={this.handleClear} variant="outlined" color="primary" style={{marginLeft:"5px"}}>
                            Clear All
                        </Button>
                    </form>
                </Dialog>
                <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                    <form onSubmit={this.handleSubmit} className="todo-form" style={{ width: "100%" }}>
                        <h3>New TODO</h3>
                        <TextField
                            id="text"
                            label="Description"
                            value={this.state.description}
                            onChange={this.handleDescriptionChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="name"
                            label="Responsible Name"
                            value={this.state.name}
                            onChange={this.hanldeNameResponsibleChange}
                            margin="normal" />

                        <TextField
                            id="email"
                            label="Responsible Email"
                            value={this.state.email}
                            onChange={this.hanldeEmailResponsibleChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="priority"
                            label="Status"
                            value={this.state.status}
                            onChange={this.handleStatusChange}
                            margin="normal" />
                        <br />
                        <TextField
                            id="due-date"
                            label="Due-Date"
                            type="date"
                            defaultValue={this.state.dueDate.format('YYYY-MM-DD')}
                            onChange={this.handleDateChange}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }} />
                        <br />
                        <Button variant="outlined" color="secondary" type="submit">
                            Add #{this.state.items.length + 1}
                        </Button>
                    </form>
                </Dialog>
            </div >
        );
    }

    handleClear(e){
        this.setState({filter: { name: '', status: '', dueDate: null }})
        this.setState({filtering: { name: '', status: '', dueDate: null }})
    }

    handleOpen(e) {
        this.setState({ open: true });
    }

    handleClose(e) {
        this.setState({ open: false });
    }

    handleOpenFilter(e) {
        this.setState({ openFilter: true });
    }

    handleCloseFilter(e) {
        this.setState({ openFilter: false });
    }

    handleDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    handleStatusChange(e) {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange(e) {
        this.setState({
            dueDate: moment(e.target.value, 'YYYY-MM-DD')
        });
    }

    hanldeEmailResponsibleChange(e) {
        this.setState({ email: e.target.value });
    }

    hanldeNameResponsibleChange(e) {
        this.setState({ name: e.target.value });
    }

    handleNameFilterChange(e) {
        const fil = this.state.filter
        fil.name = e.target.value;
        this.setState({ filter: fil });
    }

    handleStatusFilterChange(e) {
        const fil = this.state.filter
        fil.status = e.target.value;
        this.setState({ filter: fil });
    }

    handleDueDateFilterChange(e) {
        const fil = this.state.filter
        fil.dueDate = moment(e.target.value, 'YYYY-MM-DD')
        this.setState({ filter: fil });
    }

    handleSubmitFilter(e) {
        e.preventDefault();
        this.setState({ filtering: this.state.filter });
        this.setState({openFilter:false});

    }

    handleSubmit(e) {

        e.preventDefault();
        console.log(this.state);

        if (!this.state.description.length || !this.state.status.length || !this.state.dueDate)
            return;

        const newItem = {
            description: this.state.description,
            status: this.state.status,
            dueDate: this.state.dueDate,
            responsible: { name: this.state.name, email: this.state.email }

        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            description: '',
            status: '',
            dueDate: moment(),
            name: '',
            email: '',
            open: false
        }));


    }

    /*componentDidMount() {
        this.setState(prevState => ({
            items: prevState.items.concat(this.props.todoList),
        }))
    }*/


    componentDidMount() {
        console.log("hola mama");
        fetch('http://localhost:8080/task')
            .then(response => response.json())
            .then(data => {
                let tasksList = [];
                data.forEach(function (task) {
                    task["dueDate"] =  moment(task["dueDate"])
                     tasksList.push(task)

                });
                this.setState({items: tasksList});
            });
    }
}

