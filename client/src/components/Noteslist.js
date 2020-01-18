import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, ListGroupItemHeading, Label, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNotes, deleteNote, toggleCompleted } from '../actions/noteActions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class Noteslist extends Component {
    state = {
        checked: new Map()
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
        // this.setState({ [name]: event.target.checked });
        const item = event.target.name;
        const isChecked = event.target.checked;
        this.setState(prevState => ({ checked: prevState.checked.set(item, isChecked) }));
    };

    onCheck = id => {
        this.props.toggleCompleted(id);
    };

  render() {
      const { notes } = this.props.note;
      return(
          <Container className="notes-container">
            { this.props.isAuthenticated ? (
                (notes.completed !== true ? (
                    <ListGroup>
                    <ListGroupItemHeading>TO DO</ListGroupItemHeading>
                    <TransitionGroup className="notes-list">
                        {notes.map(({ _id, text }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Label 
                                    check
                                    className="checkbox-label"
                                    >
                                    <Input 
                                    className="checkbox"
                                    type="checkbox" 
                                    name="checkbox"
                                    checked={this.state.checked.get(notes._id)}
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
                                        className="trash-icon"
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