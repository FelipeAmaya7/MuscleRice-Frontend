import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      
      
      <section className="slider error">
         <div className="container">
             <div className="row">
                 <div className="col-md-4 col-md-offset-4">
          <img src="/img/404-error.png" alt="404-error" />
                  </div>
             </div>
             <div className="row">
                 <div className="col-md-12">
                     <div className="text">
                         <h2>Oops, page not found.</h2>
                         <p>It looks like nothing was found at this location. <br /> Click the link below to return home.</p>
                         <h4>You might try searching our site or visit the <span><Link to="/">homepage</Link></span>.</h4>
                          <form method="get" action="#">
                              <label>
                              <input type="search" placeholder="Search for page" />
                              </label>
                              <button className="search-global__btn"><i className="icon fa fa-search"></i></button>
                          </form>
                     </div>
                 </div>
             </div>
         </div>
      </section>
      
      
    </>
  );
}

export default NotFoundPage;
