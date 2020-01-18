import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getNotes, deleteNote } from '../actions/noteActions';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


class Noteslist extends Component {
    static propTypes = {
        getNotes: PropTypes.func.isRequired,
        note: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getNotes();
    }

    onDeleteClick = id => {
        this.props.deleteNote(id);
    }

  render() {
      const { notes } = this.props.note;
      return(
          <Container>
            { this.props.isAuthenticated ? (
                <ListGroup>
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
    { getNotes, deleteNote }
    )(Noteslist);