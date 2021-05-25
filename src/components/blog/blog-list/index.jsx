import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
export default class BlogList extends Component {

  state = {
    posts: ""
  }

  componentDidMount = async () => {
    const apiUrl = process.env.REACT_APP_API_URL 
    await this.fetchPosts(apiUrl)
    
  }

  fetchPosts = async (apiUrl) => {
    try {
    const resp = await fetch(`${apiUrl}/blogposts`)
    const data = await resp.json()

    this.setState({posts: data})
    } catch (error) {
      console.log(error)
    }
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
