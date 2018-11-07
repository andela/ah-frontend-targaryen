import React, { Component } from 'react';
import { connect } from 'react-redux';
import { writeArticle } from '../../actions/articleActions';

class NewArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { title, description, body } = this.state;
    const payload = {
      article: {
        title,
        description,
        body,
      },
    };
    const { getArticle } = this.props;
    getArticle(payload);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { title, description, body } = this.state;
    return (
      <form id="form" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <label className="control-label" htmlFor="title">Title</label>
            </div>
            <div className="col-md-10">
              <input type="text" name="title" className="form-control" id="title" value={title} onChange={this.handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <label className="control-label" htmlFor="description">description</label>
            </div>
            <div className="col-md-10">
              <input type="text" name="description" className="form-control" id="description" value={description} onChange={this.handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <label className="control-label" htmlFor="body">body</label>
            </div>
            <div className="col-md-10">
              <textarea name="body" className="form-control" id="body" value={body} onChange={this.handleChange} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  articlesPayload: state.article.articlesPayload,
});

export default connect(
  mapStateToProps,
  { getArticle: writeArticle },
)(NewArticle);
