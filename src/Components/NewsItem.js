import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
       let {title,description,imageurl,newsurl,author,date,source}=this.props
        return (
            <div className='my-3' style={{width:'20em'}}>
             <div className="card" >
               <div style={{display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0'}}>
                <span className="badge rounded-pill bg-danger">{source}</span>
  </div>
             <img src={imageurl?imageurl:'https://english.cdn.zeenews.com/sites/default/files/2021/12/24/999151-untitled-design-2021-12-24t182406.466.jpg'} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on  {new Date(date).toGMTString()}</small></p>
    <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">Read more</a>
  </div>
</div>   
            </div>
        )
    }
}

export default NewsItem
