import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle , Breadcrumb, BreadcrumbItem, Button, Label, Col, Row, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState(
            {
                isModalOpen: !this.state.isModalOpen
            }
        );
    }

    handleModal(event){
        this.toggleModal();
        event.preventDefault();
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick = {this.toggleModal}>
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>

                <Modal isOpen = {this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={10}>
                                <Control.select model='.rating' name='rating'
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={2}>Your Name</Label>
                            <Col md={10}>
                                <Control.text model='.name' id="name" name="name"
                                placeholder="Your Name"
                                className="form-control"
                                validators={
                                    {
                                        minLength:minLength(3),maxLength:maxLength(15)
                                    }
                                }/>
                                <Errors
                                    className="text-danger" 
                                    model=".name"
                                    show="touched"
                                    messages={
                                        {
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }
                                    }
                                />
                    
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={2}>Comment</Label>
                            <Col md={10}>
                                <Control.textarea model='.comment' id="comment" name="comment"
                                rows="12"
                                className="form-control"/>
                    
                            </Col>
                        </Row>
                        <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }  
}

function RenderDish({dish}) {

        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
    function RenderComments({comments, addComment, dishID}){
        if (comments == null) {
            return (<div></div>)
        }
        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit'
                    }).format(new Date(comment.date))}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {cmnts}
                </ul>
                <CommentForm dishId = {dishID} addComment={addComment}/>
            </div>
        )
    }
    const DishDetail= (props) => {
        
        if (props.dish == null) {
            return (<div></div>);
        }

        return (
            <div className = "container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className='row'>
                    <RenderDish dish = {props.dish}/>
                    <RenderComments comments = {props.comments} 
                    addComment = {props.addComment}
                    dishID ={props.dish.id}/>
                </div>
             </div>
        )
    }


export default DishDetail;