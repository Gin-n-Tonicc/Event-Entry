function ContactUsMap() {
  return (
    <div className="col-md-6 wow fadeInUp" data-wow-delay="0.1s">
      <iframe
        className="position-relative rounded w-100 h-100"
        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=%D0%A2%D1%8A%D1%80%D0%B3%D0%BE%D0%B2%D0%B8%D1%89%D0%B5%20%D0%A6%D0%B5%D0%BD%D1%82%D1%8A%D1%80,%20%D1%83%D0%BB.%20%E2%80%9E%D0%9F%D0%B5%D1%82%D0%BA%D0%BE%20%D0%A0.%20%D0%A1%D0%BB%D0%B0%D0%B2%D0%B5%D0%B9%D0%BA%D0%BE%D0%B2%E2%80%9C%2027,%207700%20%D0%A2%D1%8A%D1%80%D0%B3%D0%BE%D0%B2%D0%B8%D1%89%D0%B5+(Hakaton)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
        frameBorder={0}
        style={{ minHeight: 400, border: 0 }}
        allowFullScreen={true}
        aria-hidden="false"
        tabIndex={0}
      />
    </div>
  );
}

export default ContactUsMap;
