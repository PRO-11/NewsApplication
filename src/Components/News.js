import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps ={
      country:"in",
      pagesize:8,
      category:"general"
  }
  static propTypes ={
      country:PropTypes.string,
      pagesize:PropTypes.number,
      category:PropTypes.string
  }
 
   capital=(s)=>{
   return s.charAt(0).toUpperCase()+s.slice(1);
  }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalresults:0
        }
        document.title=`${this.capital(this.props.category)}- NewsApp`;
    }
    async update(){
      this.props.setProgress(10)
      let data=await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pagesize}`)
    this.setState({loading:true})
    this.props.setProgress(30)
     let parsed=await data.json();
     this.props.setProgress(50)
      this.setState({
        articles:parsed.articles,
        loading:false,
        totalresults:parsed.totalresults
    });
    this.props.setProgress(100)
    }
    async componentDidMount()
  {
   console.log("pro");
    this.update();
  }
    // page2News=async ()=>{
    // this.setState({page:this.state.page+1})
    // this.update();
    //  }
    //  page1News=async()=>{
    //   this.setState({page:this.state.page-1})
    //   this.update();
    //     }
        fetchMoredata=async ()=>{
          let data=await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=158ddd9ab30341eeba6da627e77254e4&page=${this.state.page+1 }&pageSize=${this.props.pagesize}`) 
          this.setState({page:this.state.page+1})
     let parsed=await data.json();
      this.setState({
        articles:this.state.articles.concat(parsed.articles)
        ,loading:false,
        totalresults:parsed.totalresults
    });
        }
    render() {
        return (
            <>
                <h2 className='text-center' style={{marginTop:"80px"}}>NewsApp-Top Headlines {this.capital(this.props.category)}</h2>
                {this.state.loading && <Loading/>}
                <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoredata}
          hasMore={this.state.articles.length!==this.state.totalresults}
          loader={<Loading/>}>
            <div className='container'>
                  <div className='row'>
              {this.state.articles.map((element)=>{
                return <div className="col md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
              })}
              </div>
              </div>
              </InfiniteScroll>     
              </>
            
        )
    }
}

export default News
