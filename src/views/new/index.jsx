import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";

export default class NewBlogPost extends Component {

  state = {
    category: "",
    title: "",
    cover: null,
    readTime: {
      value: null,
      unit: ""
    },
    author: {
      name: "",
      avatar: ""
    },
    content: "",
    comments: []
  }

  handleChange(e) {
    const id = e.target.id
    const value = e.target.value
    this.setState({ [id]: value });
  }

  submitForm1 = async (e) => {
    console.log(this.state.cover)
    const data = this.state
    
    console.log(data)

    try {

      const results = await fetch("http://localhost:3001/blogposts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      console.log(results)


      const json = await results.json()
      console.log(json)
      let id = await json._id
      console.log(id)
      console.log(this.state.cover)

      if (this.state.cover) {
        
        let formData = new FormData()
        formData.append("blogCover", this.state.cover)

        const post = await fetch(`http://localhost:3001/blogposts/${id}/uploadCover`,
          {
            method: "POST", 
            body:formData,
            redirect: 'follow'

          })

        console.log(post)
        console.log(await post.json())

      }
    

    } catch (error) {
      console.log(error)
      
    }
    
  }

  render() {
    return (
      <Container className="new-blog-container">
        <Form className="mt-5">
          <Form.Group className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control id="title" type="text" value={this.state.title} onChange={(e) => this.handleChange(e)} size="lg" placeholder="Title" />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control id="category" value={this.state.category} onChange={(e) => this.handleChange(e)} size="lg" as="select">
              <option>Category1</option>
              <option>Category2</option>
              <option>Category3</option>
              <option>Category4</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill
              id="content"
              value={this.state.content}
              onChange={(value) => this.setState({ content: value })}
              className="new-blog-content"
              type="text"
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Read Time</Form.Label>
            <Form.Control className="col-md-6" id="readTime.value" type="number" value={this.state.readTime.value} onChange={(e) => this.handleChange(e)} size="lg" placeholder="Read time value" />
            <Form.Control id="readTime.units" type="text" value={this.state.readTime.units} onChange={(e) => this.handleChange(e)} size="lg" placeholder="Read time units" />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Post cover pic</Form.Label>
            <Form.Control type="file" onChange={(e) => this.setState({cover: e.target.files[0] })} size="lg" />
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="button"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
              onClick={(e) => this.submitForm1(e)}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
