import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
 
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addNote } from '../actions/noteActions';
import PropTypes from 'prop-types';

class NoteModal extends Component {
    state = {
        modal: false,
        text: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    // Function to toggle modal open or close
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    // Event change function
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    // Submit function to add note
    onSubmit = e => {
        e.preventDefault();

        const newNote = {
            text: this.state.text
        }

        // Add note with addNote
        this.props.addNote(newNote);

        // Close modal
        this.toggle();
    }

    render() {
        return(
            <div>
                { this.props.isAuthenticated ? (
                <a
                    style={{marginBottom: '2rem'}}
                    onClick={this.toggle}
                >
                   <FontAwesomeIcon icon={faPlus} 
                    size="3x"
                    className="addIcon"
                   />
                </a>
                ) : (
                <h1 className="mb-3 text-center"></h1>
                )}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    modalTransition={{ timeout: 200 }} 
                    backdropTransition={{ timeout: 200 }}
                >
                    <ModalHeader
                        toggle={this.toggle}
                    >
                        Add To Notes
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="note">Note</Label>
                                <Input 
                                    type="text"
                                    name="text"
                                    id="note"
                                    placeholder="Add note"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                >
                                    Add Note
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    note: state.note,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addNote })(NoteModal);