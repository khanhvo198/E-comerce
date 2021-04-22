import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, List } from 'reactstrap';
import Policy from 'constants/policy';
import db, { storage, firebase } from 'firebase/firebase.config';
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
    const storageRef = storage.ref()

    const getFileName = (fileName) => {
        return fileName.split('.')[0] + user.uid + (new Date(Date.now()).getTime()) + '.' + fileName.split('.').pop()
    }

    const uploadFiles = (filesUpload) => {
        filesUpload.forEach((file) => {
            const metadata = {
                contentType: `image/${file.name.split('.').pop()}`
            }
            const uploadTask = storageRef.child(`images/comments/${file.name}`).put(file, metadata)
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                            console.log('Upload is paused');
                            break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        console.log("Upload Comment Success")
                        toggle()
                    });
                }
            );
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        const filesUpload = files.map((file) => (
            new File([file], getFileName(file.name))
        ))
        const data = {
            comment: comment,
            rating: parseInt(rating),
            productid: productid,
            userid: user.uid,
            imageList: filesUpload.map((file) => (
                file.name
            )),
        }
        const ref = db.collection('Comments')
            .where('productid', '==', productid)
            .where('userid', '==', user.uid)
            .get().then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.docs.forEach((doc) => {
                        db.collection('Comments').doc(doc.id).set(data).then(() => {
                            uploadFiles(filesUpload)
                        })
                    })
                } else {
                    db.collection('Comments').add(data).then((doc) => {
                        // console.log("Document ID: ", doc.id)
                        // toggle()
                        uploadFiles(filesUpload)
                    })
                }
            }).catch((error) => {
                console.log("Upload Comment Error: ", error)
            }).finally(() => {
                setFiles([])
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
        setFiles([...files, ...e.target.files])
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
                            <Label for={`comment${productid}`}>Images:</Label>
                            <List type="unstyled">
                                {files.map((file) => (
                                    <li>{file.name}</li>
                                ))}
                            </List>
                            <Input
                                type="file"
                                multiple={true}
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