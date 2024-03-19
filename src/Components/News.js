import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
  static defaultProps = {
    country:'in',
    pageSize:6,
    category:"general"
  }
  static propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("Constructor from News Component");
    this.state = {
      articles: [], //this.articles,
      loading: false,
      page: 1,
      totalResults: 0
    };
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-News Feed`
  }
  async updateNews(){
    this.props.setProgress(10);
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
    this.props.setProgress(100);
  }
  async componentDidMount() {
  //   console.log("cdm");
  //   let url =
  //     `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1c6b249b2ca4298bc5011e313afa592&page=1&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //   let parsedData = await data.json();
  //   console.log(parsedData);
  //   this.setState({
  //     articles: parsedData.articles,
  //     totalResults: parsedData.totalResults,
  //     loading:false
  //   });
  this.updateNews();
  }
  handlePrevious = async () => {
    // console.log("Prev");
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1c6b249b2ca4298bc5011e313afa592&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false 
    // });
    this.setState({page:this.state.page-1})
    this.updateNews();
  };
  handleNext = async () => {
    // console.log("Next");
    // if (this.state.page + 1 < Math.ceil(this.state.totalResults / this.props.pageSize)) {

    // // }else{
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d1c6b249b2ca4298bc5011e313afa592&page=${
    //     this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   });
    // }
    this.setState({page:this.state.page+1})
    this.updateNews();
  };
   fetchMoreData = async () => {
    
    const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      // this.setState({loading:true});
      this.setState({page: this.state.page+1});
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false
    });
  };
  render() {
    console.log("render");
    return (
      <>
        <div className="container my-3">
          <h2 className="text-center"style={{margin: '40px 0px', marginTop:'90px'}}>Today's {this.capitalizeFirstLetter(this.props.category)} Feed !! </h2>
          {this.state.loading&&<Spinner/>}
          <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://cdn.ndtv.com/common/images/ogndtv.png"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
          </InfiniteScroll>
          
          {/* <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.handlePrevious}
            >
              &larr;Previous
            </button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              type="button"
              class="btn btn-dark"
              onClick={this.handleNext}
            >
              Next&rarr;
            </button>
          </div> */}
        </div>
      </>
    );
  }
}
