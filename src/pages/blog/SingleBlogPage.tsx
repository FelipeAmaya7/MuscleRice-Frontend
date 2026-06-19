import { Link } from 'react-router-dom';

function SingleBlogPage() {
  return (
    <>
      
      
      <section className="blog-slide-text">
          <div className="container">
              <div className="row">
                  <div className="col-md-9">
                      <div className="owl-carousel">
                        <div className="one">
                            <img src="/img/single-blog-page.webp" alt="" />
                            <p>Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                            <p>not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        </div>
                        <div className="one">
                            <img src="/img/single-blog-page.webp" alt="" />
                            <p>Is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...</p>
                            <p>not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged...</p>
                        </div>
                      </div>
                      <div className="shere">
                          <div className="row">
                              <div className="col-md-12">
                                  <h2>Share Post</h2>
                                  <p>
                                    <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                    <a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a> 
                                  </p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-3">
                      <div className="blog-sidebar">
                                     <h2>Recent Post</h2>
                              <div className="resent-post">
                                  <div className="resent-post-single">
                                      <div className="row">
                                          <div className="col-md-12">
                                              <img src="/img/man.webp" alt="" />
                                              <div className="text">
                                                  <h3>Is simply dummy text</h3>
                                                  <p>September 6, 2016</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="resent-post-single">
                                      <div className="row">
                                          <div className="col-md-12">
                                              <img src="/img/man.webp" alt="" />
                                              <div className="text">
                                                  <h3>Is simply dummy text</h3>
                                                  <p>September 6, 2016</p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                      </div>
                      <div className="blog-sidebar">
                                 <h2>Categories</h2>
                          <div className="categorie">
                              <div className="row">
                                  <div className="col-md-12">
                                      <p>Advice (8)</p>
                                      <p>Articles (20)</p>
                                      <p>Comments (10)</p>
                                      <p>Design (5)</p>
                                      <p>Other (3)</p>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="blog-sidebar">
                                 <h2>Tags</h2>
                          <div className="tags">
                              <div className="row">
                                  <div className="col-md-12">
                                      <span>bussiness</span>
                                      <span>bussiness</span>
                                      <span>fun</span>
                                      <span>lorem</span>
                                      <span>performence</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <section className="comment">
         <div className="container">
             <div className="row">
                 <div className="col-md-12">
                     <div className="commententries">                         
                              <h3> Comments (3) </h3>
                              
                              <ul className="commentlist">
                                  <li> 
                                      <article className="comment">
                                          
                                          <section className="comment-details">
                                              <div className="author-name"> <a title="" href=""> <h5>Sadman Abir<span> June 2, 2016 at 12:05 pm </span></h5></a> </div>
                                              <div className="comment-body">
                                                  <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
                                              </div>
                                              <div className="reply"> <a title="" href=""><p>Reply</p></a> </div>
                                          </section>   
                                      </article>
                                      
                                      <ul className="children">
                                          <li> 
                                              <article className="comment">
                                                  
                                                  <section className="comment-details">
                                                      <div className="author-name"> <a title="" href=""> <h5>Sadman Abir<span> June 2, 2016 at 12:05 pm </span></h5></a> </div>
                                                      <div className="comment-body">
                                                          <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
                                                      </div>
                                                      <div className="reply"> <a title="" href=""><p>Reply</p></a> </div>
                                                  </section>  
                                              </article> 
                                          </li>        
                                      </ul>
                                                
                                  </li>  
                                  <li> 
                                      <article className="comment">
                                          
                                          <section className="comment-details">
                                              <div className="author-name"> <a title="" href=""> <h5>Sadman Abir<span> June 2, 2016 at 12:05 pm </span></h5></a> </div>
                                              <div className="comment-body">
                                                  <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
                                              </div>
                                              <div className="reply"> <a title="" href=""><p>Reply</p></a> </div>
                                          </section> 
                                      </article>                                      
                                  </li>        
                              </ul>
                               
                      </div>
                 </div>
             </div>
             <div className="row">
                 <div className="col-md-12">
                    <h2>Leave a Comment</h2>
                     <form action="php/sendmail.php" method="get">
                      <p>Comment</p>
                      <textarea></textarea>
                      <p>Name*</p>
                      <input type="text" name="" required />
                      <p>Email*</p>
                      <input type="email" name="" required />
                      <p>Website</p>
                      <input type="text" name="" />
                      <input type="submit" value="SEND" />     
                      </form>
                 </div>
             </div>
         </div>
      </section>
      
      
    </>
  );
}

export default SingleBlogPage;
