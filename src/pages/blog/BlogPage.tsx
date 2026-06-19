import { Link } from 'react-router-dom';

function BlogPage() {
  return (
    <>
      
      
      <section className="blog_slider">
         <div className="blog_overlay"></div>
          <img src="/img/blog-slider.webp" alt="Blog Slider" />
          <h2>BLOG</h2>
      </section>
      
      <section className="blog-slide-text">
          <div className="container">
              <div className="row">
                  <div className="col-md-9">
                     <div className="b-slide-text">
                     <div className="row">
                          <div className="col-md-5">
                              <div className="b-slide">
                                  <img src="/img/blog-slide-1.webp" alt="" />
                              </div>
                          </div>
                          <div className="col-md-7">
                              <div className="b-text">
                                  <h2> Is simply dummy text of the printing </h2>
                                  <p><span><i className="fa fa-calendar" aria-hidden="true"></i>August 03,2016</span><span><i className="fa fa-comment" aria-hidden="true"></i>4 comments</span></p>
                             <h4>been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </h4>
                             <Link to="/blog/single" className="read-more"> READ MORE</Link>
                              </div>
                          </div>
                      </div>
                     </div>
                     <div className="b-slide-text">
                     <div className="row">
                          <div className="col-md-5">
                              <div className="b-slide">
                                  <img src="/img/blog-slide-2.webp" alt="" />
                              </div>
                          </div>
                          <div className="col-md-7">
                              <div className="b-text">
                                  <h2> Is simply dummy text of the printing </h2>
                                  <p><span><i className="fa fa-calendar" aria-hidden="true"></i>August 03,2016</span><span><i className="fa fa-comment" aria-hidden="true"></i>4 comments</span></p>
                             <h4>been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </h4>
                             <Link to="/blog/single" className="read-more"> READ MORE</Link>
                              </div>
                          </div>
                      </div>
                     </div>
                      <div className="b-slide-text">
                     <div className="row">
                          <div className="col-md-5">
                              <div className="b-slide">
                                  <img src="/img/blog-slide-3.webp" alt="" />
                              </div>
                          </div>
                          <div className="col-md-7">
                              <div className="b-text">
                                  <h2> Is simply dummy text of the printing </h2>
                                  <p><span><i className="fa fa-calendar" aria-hidden="true"></i>August 03,2016</span><span><i className="fa fa-comment" aria-hidden="true"></i>4 comments</span></p>
                             <h4>been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </h4>
                             <Link to="/blog/single" className="read-more"> READ MORE</Link>
                              </div>
                          </div>
                      </div>
                     </div>
                      <div className="b-slide-text">
                     <div className="row">
                          <div className="col-md-5">
                              <div className="b-slide">
                                  <img src="/img/blog-slide-4.webp" alt="" />
                              </div>
                          </div>
                          <div className="col-md-7">
                              <div className="b-text">
                                  <h2> Is simply dummy text of the printing </h2>
                                  <p><span><i className="fa fa-calendar" aria-hidden="true"></i>August 03,2016</span><span><i className="fa fa-comment" aria-hidden="true"></i>4 comments</span></p>
                             <h4>been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it is simply dummy text of the printing and typesetting industry. Lorem Ipsum has </h4>
                             <Link to="/blog/single" className="read-more"> READ MORE</Link>
                              </div>
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
                  <div className="container">
                      <div className="row">
                          <div className="col-md-4 col-md-offset-4">
                              <div className="centre">
                                  <ul className="pagination pagination-lg">
                                  <li><a href="#">1</a></li>
                                  <li><a href="#">2</a></li>
                                  <li><a href="#">3</a></li>
                                  <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i></a></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  
      
    </>
  );
}

export default BlogPage;
