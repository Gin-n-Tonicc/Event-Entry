import { Link } from 'react-router-dom';
import { PageEnum } from '../../types/enums';

interface BreadcrumbProps {
  pageName: string;
  pagePathName: string;
}

function Breadcrumb(props: BreadcrumbProps) {
  return (
    <div className="container-xxl py-5 bg-dark page-header mb-5">
      <div className="container my-5 pt-5 pb-4">
        <h1 className="display-3 text-white mb-3 animated slideInDown">
          {props.pageName}
        </h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb text-uppercase">
            <li className="breadcrumb-item">
              <Link to={PageEnum.Home}>Home</Link>
            </li>
            <li
              className="breadcrumb-item text-white active"
              aria-current="page">
              {props.pagePathName}
            </li>
          </ol>
        </nav>
      </div>
    </div>
  );
}

export default Breadcrumb;
