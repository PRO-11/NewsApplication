// import React, { Component, useState } from 'react'
import Loading from './Loading';
import NewsItemFunc from './NewsItemFunc'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import React ,{useState,useEffect} from 'react';
export default function NewsFunc(props) {

    const capital=(s)=>{
   return s.charAt(0).toUpperCase()+s.slice(1);
  }
  let [articles,setarticle]=useState([]);
  let [loading,setloading]=useState(true);
  let [page,setpage]=useState(1);
  let [totalresults,settotalresults]=useState(0);
   
        document.title=`${props.capital(props.category)}- NewsApp`;
    const update=async()=>{
      props.setProgress(10)
      let data=await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pagesize}`)
   setloading(true)
    props.setProgress(30)
     let parsed=await data.json();
     props.setProgress(50)
     setarticle(parsed.articles);
     setloading(false)
     settotalresults(parsed.totalresults)
    props.setProgress(100)
    }
    useEffect(()=>{
      update();
    },[])
    const page2News=async ()=>{
    setpage(page+1)
    update();
     }
     const page1News=async()=>{
        setpage(page-1)
        update();
        }
       const  fetchMoredata=async ()=>{
            setpage(page+1)
          let data=await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}}&page=${page}&pageSize=${props.pagesize}`) 
     let parsed=await data.json();
     setarticle(articles.concat(parsed.articles))
     setloading(false);
     settotalresults(parsed.totalresults)
        }
        return (
            <>
                <h2 className='text-center'>NewsApp-Top Headlines {capital(props.category)}</h2>
                {loading && <Loading/>}
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoredata}
          hasMore={articles.length!==totalresults}
          loader={<Loading/>}>
            <div className='container'>
                  <div className='row'>
              {articles.map((element)=>{
                return <div className="col md-4" key={element.url}>
            <NewsItemFunc title={element.title?element.title:""} description={element.description?element.description:""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
              })}
              </div>
              </div>
              </InfiniteScroll>     
              </>
            
        )
    }
NewsFunc.defaultProps ={
    country:"in",
    pagesize:8,
    category:"general"
}
NewsFunc.propTypes ={
    country:PropTypes.string,
    pagesize:PropTypes.number,
    category:PropTypes.string
}
