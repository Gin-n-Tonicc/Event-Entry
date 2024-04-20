import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  text: string;
  to: string;
  dropdown?: boolean;
  img?: string;
}

function NavItem(props: NavItemProps) {
  const location = useLocation();
  let classNames = 'nav-item nav-link ';

  if (props.dropdown) {
    classNames = 'dropdown-item ';
  }

  if (location.pathname === props.to) {
    classNames += 'active';
  }

  return (
    <Link to={props.to} className={classNames}>
      {props.img ? (
        <img style={{ height: '50px' }} src={props.img} alt={props.text} />
      ) : (
        props.text
      )}
    </Link>
  );
}

export default NavItem;
