import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import Policy from 'constants/policy';
import db from 'firebase/firebase.config';
import { useSelector } from 'react-redux';

CommentModal.propTypes = {

};

function CommentModal(props) {
    const { label, productid, title } = props
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const [rating, setRating] = useState(Policy.MAX_RATING)
    const [comment, setComment] = useState('')
    const [files, setFiles] = useState([])
    const user = useSelector(state => state.user)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Files: ", files)
        const data = {
            comment: comment,
            rating: parseInt(rating),
            productid: productid,
            userid: user.uid,
            imageList: [],
        }
        const ref = db.collection('Comments')
            .where('productid', '==', productid)
            .where('userid', '==', user.uid)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.docs.forEach((doc) => {
                        db.collection('Comments').doc(doc.id).set(data).then(() => {
                            console.log("Upload Comment Success")
                            toggle()
                        })
                    })
                } else {
                    db.collection('Comments').add(data).then((doc) => {
                        console.log("Document ID: ", doc.id)
                        toggle()
                    })
                }
            }).catch((error) => {
                console.log("Upload Comment Error: ", error)
            })
    }
    const handleRatingChange = (e) => {
        e.preventDefault()
        setRating(e.target.value)
    }

    const handleCommentChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }

    const handleFilesChange = (e) => {
        e.preventDefault()
        setFiles([...e.target.files])
    }

    return (
        <div className='comment-modal'>
            <Button color='primary' onClick={toggle}>{label}</Button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>{title}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for={`rating${productid}`}>Rating:</Label>
                            <Input
                                type="number"
                                max={Policy.MAX_RATING}
                                min={1}
                                step={1}
                                name="rating"
                                defaultValue={Policy.MAX_RATING}
                                onChange={handleRatingChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for={`comment${productid}`}>Comment:</Label>
                            <Input
                                type="textarea"
                                name="comment"
                                defaultValue={""}
                                placeholder="Type your comment here ..."
                                onChange={handleCommentChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for={`comment${productid}`}>Comment:</Label>
                            <Input
                                type="file"
                                multiple
                                name="files"
                                onChange={handleFilesChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default CommentModal;