import about1 from './img/about-1.jpg';
import about2 from './img/about-2.jpg';
import about3 from './img/about-3.jpg';
import about4 from './img/about-4.jpg';

function HomeHowToStart() {
  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
            <div className="row g-0 about-bg rounded overflow-hidden">
              <div className="col-6 text-start">
                <img className="img-fluid w-100" src={about1} />
              </div>
              <div className="col-6 text-start">
                <img
                  className="img-fluid"
                  src={about2}
                  style={{ width: '85%', marginTop: '15%' }}
                />
              </div>
              <div className="col-6 text-end">
                <img
                  className="img-fluid"
                  src={about3}
                  style={{ width: '85%' }}
                />
              </div>
              <div className="col-6 text-end">
                <img className="img-fluid w-100" src={about4} />
              </div>
            </div>
          </div>
          <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <h1 className="mb-4">
              We Help To Get The Best Job And Find A Talent
            </h1>
            <p className="mb-4">
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
              diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
              lorem sit clita duo justo magna dolore erat amet
            </p>
            <p>
              <i className="fa fa-check text-primary me-3" />
              Tempor erat elitr rebum at clita
            </p>
            <p>
              <i className="fa fa-check text-primary me-3" />
              Aliqu diam amet diam et eos
            </p>
            <p>
              <i className="fa fa-check text-primary me-3" />
              Clita duo justo magna dolore erat amet
            </p>
            <a className="btn btn-primary py-3 px-5 mt-3" href="">
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHowToStart;
