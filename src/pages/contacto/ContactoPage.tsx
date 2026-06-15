import { Link } from 'react-router-dom';

function ContactoPage() {
  return (
    <>
      
      
      <section className="maps">
          <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d28747.851497593252!2d89.24895624999999!3d25.754656999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1484143225401" width="100%" height="550" frameBorder="0" style={{border: 0}} allowFullScreen></iframe>
      </section>
      
      <section className="contact-us">
          <div className="container">
              <div className="row">
                  <div className="col-md-6">
                      <div className="contact">
                         <h2>Contact Details</h2>
                          <div className="col-md-6">
                             <div className="contact_icon">
                             <div className="icon">
                                 <i className="fa fa-facebook" aria-hidden="true"></i>
                             </div>
                             <div className="c_text">
                                 <p>0800 366 8747</p>
                                 <p>8923 558 0024</p>
                             </div>
                             </div>
                         </div>
                         <div className="col-md-6">
                             <div className="contact_icon">
                             <div className="icon">
                                 <i className="fa fa-twitter" aria-hidden="true"></i>
                             </div>
                             <div className="c_text">
                                 <p>0800 366 8747</p>
                                 <p>8923 558 0024</p>
                             </div>
                             </div>
                         </div>
                         <div className="col-md-6">
                             <div className="contact_icon">
                             <div className="icon">
                                 <i className="fa fa-envelope" aria-hidden="true"></i>
                             </div>
                             <div className="c_text">
                                 <p>support@shawon.com</p>
                                 <p>shawon@gmail.com</p>
                             </div>
                             </div>
                         </div>
                         <div className="col-md-6">
                             <div className="contact_icon">
                             <div className="icon">
                                 <i className="fa fa-twitter" aria-hidden="true"></i>
                             </div>
                             <div className="c_text">
                                 <p>shawon_store</p>
                                 <p>abir_support</p>
                             </div>
                             </div>
                         </div>
                      </div>
                  </div>
                  <div className="col-md-6">
                      <div className="get_in_touch">
                         <h2>Get in Touch with Us</h2>
                          <form action="#" method="post">
                              <p>Your Name (required)</p>
                              <input type="text" name="" />
                              <p>Your Email (required)</p>
                              <input type="email" name="" />
                              <p>Your Company</p>
                              <input type="text" name="" />
                              <p>Telephone Number</p>
                              <input type="text" name="" />
                              <p>Your Message</p>
                              <textarea rows={10} cols={50}></textarea>
                              <input type="submit" value="SEND" />
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      
    </>
  );
}

export default ContactoPage;
