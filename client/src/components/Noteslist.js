import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button, ListGroupItemHeading, Label, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNotes, deleteNote, toggleCompleted } from '../actions/noteActions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Noteslist extends Component {
    state = {
        checked: false
    };

    static propTypes = {
        getNotes: PropTypes.func.isRequired,
        toggleCompleted: PropTypes.func.isRequired,
        note: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getNotes();
    };

    onDeleteClick = id => {
        this.props.deleteNote(id);
    };

    onChange = name  => event => {
        this.setState({ [name]: event.target.checked });
    };

    onCheck = id => {
        this.props.toggleCompleted(id);

        // const updatedNote = {
        //     completed: true
        // }
        // this.props.toggleCompleted(id, updatedNote);

    };

  render() {
      const { notes } = this.props.note;
    //   const hasCompleted = notes.filter((note) => !note.completed)
    //   const notCompleted = notes.filter((note) => note.completed)
      const hasCompleted = notes.filter(Boolean)
  
      return(
          <Container>
            { this.props.isAuthenticated ? (
                (hasCompleted ? (
                    <ListGroup>
                    <ListGroupItemHeading>TO DO</ListGroupItemHeading>
                    <TransitionGroup className="notes-list">
                        {hasCompleted.map(({ _id, text }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Label check>
                                    <Input 
                                    type="checkbox" 
                                    name="checkbox"
                                    checked={this.state.checked}
                                    onChange={this.onChange.bind(this, _id)}
                                    onClick={this.onCheck.bind(this, _id)}
                                    />
                                    {text}
                                    </Label>
                                    <a
                                        className="remove-btn"
                                        color="info"
                                        size="small"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash}
                                        size="lg" 
                                        className="trashIcon"
                                    />
                                    </a>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
                ) : (
                <ListGroup>
                <ListGroupItemHeading>COMPLETED</ListGroupItemHeading>
                <TransitionGroup className="notes-list">
                    {notes.map(({ _id, text }) => (
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <a
                                    className="remove-btn"
                                    color="info"
                                    size="small"
                                    onClick={this.onDeleteClick.bind(this, _id)}
                                >
                                    <FontAwesomeIcon icon={faTrash}
                                    size="lg" 
                                    className="trashIcon"
                                />
                                </a>
                                {text}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
            ))
            ) : null}
          </Container>
      );
  }
}

const mapStateToProps = (state) => ({
    note: state.note,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, 
    { getNotes, deleteNote, toggleCompleted }
    )(Noteslist);