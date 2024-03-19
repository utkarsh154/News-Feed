import React, { Component } from "react";

export default class NewsItem extends Component{
  render(){
    let { title, description, imageUrl, newsUrl, author, date,source } =this. props;
    return (
      <div className="my-3">
        <div className="card" /*style={{ width: "18rem" }}*/>
        <div style={
                {
                  display:'flex',
                  justifyContent:'flex-end',
                  position:'absolute',
                  right:'0'
                }
              }>
              <span className="badge rounded-pill bg-danger">{source}</span>
              </div>
          <img src={imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            
              
              <h5 className="card-title">
              {title}...</h5>
            <p className="card-text">{description}</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
            <div className="card-footer">
              <small class="text-body-secondary my-2">
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </div>
          </div>
        </div>
      </div>
    );
 }
}

// export default NewsItem;
