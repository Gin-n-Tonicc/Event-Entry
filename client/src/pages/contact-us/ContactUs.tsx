import ContactUsBreadcrumb from './contact-us-breadcrumb/ContactUsBreadcrumb';
import ContactUsForm from './contact-us-form/ContactUsForm';
import ContactUsMap from './contact-us-map/ContactUsMap';
import ContactUsRectangle from './contact-us-rectangle/ContactUsRectangle';

function ContactUs() {
  return (
    <>
      <ContactUsBreadcrumb />
      <div className="container-xxl py-5">
        <div className="container">
          <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
            Contact For Any Query
          </h1>
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                <ContactUsRectangle
                  iconClassName="fa-map-marker-alt"
                  spanText={'7700 Targovishte town, "Cap. Danajiev"'}
                />
                <ContactUsRectangle
                  iconClassName="fa-envelope-open"
                  spanText="stefanbelis932@gmail.com"
                />
                <ContactUsRectangle
                  iconClassName="fa-phone-alt"
                  spanText="00 (359) 601 6-30-70"
                />
              </div>
            </div>
            <ContactUsMap />
            <ContactUsForm />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
