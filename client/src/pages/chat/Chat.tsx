import { Link } from 'react-router-dom';
import { PageEnum } from '../../types';
import './Chat.css';

function Chat() {
  return (
    <div className="d-flex flex-column justify-content-center container mt-5 custom-chatter">
      <h2 className="text-center">Chat With</h2>
      <Link to={PageEnum.Profile} className="mb-5">
        <h5 className="text-primary text-center text-decoration-underline">
          Sarah Anderson
        </h5>
      </Link>
      <div className="wrapper">
        <div className="main">
          <div className="px-2 scroll">
            <div className="d-flex align-items-center">
              <div className="text-left pr-1">
                <img
                  src="https://img.icons8.com/color/40/000000/guest-female.png"
                  width={30}
                  className="img1"
                />
              </div>
              <div className="pr-2 pl-1">
                {' '}
                <span className="name">Sarah Anderson</span>
                <p className="msg">
                  Hi Dr. Hendrikson, I haven't been falling well for past few
                  days.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center text-right justify-content-end ">
              <div className="pr-2">
                {' '}
                <span className="name">Dr. Hendrikson</span>
                <p className="msg">Let's jump on a video call</p>
              </div>
              <div>
                <img
                  src="https://i.imgur.com/HpF4BFG.jpg"
                  width={30}
                  className="img1"
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="text-left pr-1">
                <img
                  src="https://img.icons8.com/color/40/000000/guest-female.png"
                  width={30}
                  className="img1"
                />
              </div>
              <div className="pr-2 pl-1">
                {' '}
                <span className="name">Sarah Anderson</span>
                <p className="msg">How often should i take this?</p>
              </div>
            </div>
            <div className="d-flex align-items-center text-right justify-content-end ">
              <div className="pr-2">
                {' '}
                <span className="name">Dr. Hendrikson</span>
                <p className="msg">Twice a day, at breakfast and before bed</p>
              </div>
              <div>
                <img
                  src="https://i.imgur.com/HpF4BFG.jpg"
                  width={30}
                  className="img1"
                />
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="text-left pr-1">
                <img
                  src="https://img.icons8.com/color/40/000000/guest-female.png"
                  width={30}
                  className="img1"
                />
              </div>
              <div className="pr-2 pl-1">
                {' '}
                <span className="name">Sarah Anderson</span>
                <p className="msg">How often should i take this?</p>
              </div>
            </div>
          </div>
          <nav className="navbar bg-white navbar-expand-sm d-flex justify-content-between">
            {' '}
            <input
              type="text number"
              name="text"
              className="form-control"
              placeholder="Type a message..."
            />
            <div className="icondiv d-flex justify-content-end align-content-center text-center ml-2">
              {' '}
              <i className="fa fa-arrow-circle-right icon2 text-primary" />{' '}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Chat;
