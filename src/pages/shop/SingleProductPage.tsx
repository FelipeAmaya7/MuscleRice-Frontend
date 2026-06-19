import { Link } from 'react-router-dom';

function SingleProductPage() {
  return (
    <>
      
      
      <section className="stylish-product">
          <div className="container">
              <div className="row">
                  <div className="col-md-5">
                      <div className="single-product-slider">
                          <img src="/img/single-product-slider.webp" alt="" />
                      </div>
                      <div className="small-slider">
                          <img src="/img/small-slider.webp" alt="" />
                          <img src="/img/small-slider.webp" alt="" />
                          <img src="/img/small-slider.webp" alt="" />
                      </div>
                  </div>
                  <div className="col-md-7">
                      <div className="single-product-text">
                          <h1>Stylish T-shart</h1>
                          <h2>&#36;40.00</h2>
                          <p><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><span><i className="fa fa-star" aria-hidden="true"></i></span></p>
                          <h6>(0 Reviews)</h6>
                          <h3>Size</h3>
                          <select>
                            <option value="volvo">xs</option>
                            <option value="saab">md</option>
                            <option value="opel">lg</option>
                            <option value="audi">xxl</option>
                          </select>
                          <div className="count_c">
                              <div className="count">
                                  <p>2</p>
                              </div>
                              <div className="cart">
                                  <p>ADD TO CART</p>
                              </div>
                          </div>
                          <h4><i className="fa fa-heart" aria-hidden="true"></i>Add to Wishlist</h4>
                          <h5>Categories:<span>Dresses</span><span>Fashion</span><span>Tops</span></h5>
                          <h5 className="tag">Tag:<span>Tops</span></h5>
                          <h5 className="love">love it, share it!</h5>
                          <p className="icon"><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a><a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></p>
                          
                      </div>
                  </div>
              </div>
          </div>
          <div className="product_description">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <h2><span className="description">Description</span><span className="review">Reviews(0)</span></h2>
                          <h3>Product Description</h3>
                          <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem  is simply dummy text of the printing and typesetting industry. </p>
                          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="related-products">
              <div className="container">
                  <div className="row">
                      <div className="col-md-12">
                          <div className="bar">
                              <h2>Related Products</h2>
                              <img src="/src/assets/images/ui/bar.webp" alt="" />
                          </div>
                      </div>
                  </div>
                  <div className="product">
                      <div className="row">
                          <div className="col-md-3">
                              <div className="s_product">
                                  <img src="/img/t-shart.webp" alt="" />
                                  <div className="s_overlay"></div>
                                  <h2>SALE!</h2>
                                  <h3>T-SHIRT</h3>
                                  <h4><i className="fa fa-cart-arrow-down" aria-hidden="true"></i>ADD TO CART</h4>
                              </div>
                              <div className="row">
                                  <div className="col-md-12">
                                      <div className="rate">
                                          <h3>Pocket Tee</h3>
                                          <p><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><span><i className="fa fa-star" aria-hidden="true"></i></span></p>
                                          <h5>$250</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-3">
                              <div className="s_product">
                                  <img src="/img/t-shart1.webp" alt="" />
                                  <div className="s_overlay"></div>
                                  <h3>T-SHIRT</h3>
                                  <h4><i className="fa fa-cart-arrow-down" aria-hidden="true"></i>ADD TO CART</h4>
                              </div>
                              <div className="row">
                                  <div className="col-md-12">
                                      <div className="rate">
                                          <h3>Pocket Tee</h3>
                                          <p><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><span><i className="fa fa-star" aria-hidden="true"></i></span></p>
                                          <h5>$250</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-3">
                              <div className="s_product">
                                  <img src="/img/t-shart2.webp" alt="" />
                                  <div className="s_overlay"></div>
                                  <h3>T-SHIRT</h3>
                                  <h4><i className="fa fa-cart-arrow-down" aria-hidden="true"></i>ADD TO CART</h4>
                              </div>
                              <div className="row">
                                  <div className="col-md-12">
                                      <div className="rate">
                                          <h3>Pocket Tee</h3>
                                          <p><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></p>
                                          <h5>$250</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-md-3">
                              <div className="s_product">
                                  <img src="/img/t-shart3.webp" alt="" />
                                  <div className="s_overlay"></div>
                                  <h2>NEW!</h2>
                                  <h3>JACKET</h3>
                                  <h4><i className="fa fa-cart-arrow-down" aria-hidden="true"></i>ADD TO CART</h4>
                              </div>
                              <div className="row">
                                  <div className="col-md-12">
                                      <div className="rate">
                                          <h3>Pocket Tee</h3>
                                          <p><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i><i className="fa fa-star" aria-hidden="true"></i></p>
                                          <h5>$250</h5>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      
    </>
  );
}

export default SingleProductPage;
