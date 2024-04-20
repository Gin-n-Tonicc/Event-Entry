interface ContactUsRectangleProps {
  iconClassName: string;
  spanText: string;
}

function ContactUsRectangle(props: ContactUsRectangleProps) {
  return (
    <div className="col-md-4 wow fadeIn" data-wow-delay="0.1s">
      <div className="d-flex align-items-center bg-light rounded p-4">
        <div
          className="bg-white border rounded d-flex flex-shrink-0 align-items-center justify-content-center me-3"
          style={{ width: 45, height: 45 }}>
          <i className={`fa ${props.iconClassName} text-primary`} />
        </div>
        <span>{props.spanText}</span>
      </div>
    </div>
  );
}

export default ContactUsRectangle;
