import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
export default class BlogList extends Component {

  state = {
    posts: ""
  }

  componentDidMount = async () => {
    await this.fetchPosts()
  }

  fetchPosts = async () => {
    const resp = await fetch("http://localhost:3001/blogposts")
    const data = await resp.json()

    this.setState({posts: data})
  }

  render() {
    return (
      <Row>
        {this.state.posts && this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
            <BlogItem key={post._id} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
