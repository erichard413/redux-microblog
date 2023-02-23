import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import './css/BlogForm.css';
import { createNewPost, updatePost } from './actionCreators';

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
  } from 'reactstrap';

const BlogForm = ({title="", description="", body=""}) => {
    const {id} = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const INITIAL_STATE = {
        title,
        description,
        body
    }

    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(data => ({
            ...data,
            [name] : value
        }))
    }
  
    const handleSubmit = (e) => {
        e.preventDefault();
        id !== undefined ? dispatch(updatePost(id, formData)) : dispatch(createNewPost(formData));
        if (id == undefined) {
            navigate("/", {replace: true})
        }
    }

    return (
        <div className="BlogForm">
            <div className="BlogForm-formdiv">
                <Form className="form">
                    <FormGroup>
                        <Label for="type">Title:</Label>
                            <Input 
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Description:</Label>
                            <Input name="description"
                            type="text"
                            value={formData.description}
                            onChange={handleChange}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="type">Body:</Label>
                            <Input name="body"
                            type="textarea"
                            id="body"
                            value={formData.body}
                            onChange={handleChange}
                            />
                    </FormGroup>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default BlogForm;