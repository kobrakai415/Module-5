import React, { Component } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import "./styles.css";

class Blog extends Component {
  state = {
    blog: "",
    loading: true,
  };
  
  
  componentDidMount = async () => {
    await this.fetchPost()
  }

  fetchPost = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL
      const id = this.props.match.params.id;
      console.log(id)

      const resp = await fetch(apiUrl + id)
      const data = await resp.json()

      this.setState({ blog: data, loading: false })
      console.log(this.state.blog)
    } catch (error) {
      console.log(error)
    }
  }

  downloadPDF = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL
      const response = await fetch(apiUrl + this.props.match.params.id)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const { loading, blog } = this.state;
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              </div>
            </div>
            <Button href={`http://localhost:3001/blogposts/downloadPDF/` + this.props.match.params.id}  variant="primary">Download as PDF</Button>
            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  }
}

export default withRouter(Blog);
