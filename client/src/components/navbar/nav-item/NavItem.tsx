import { Link, useLocation } from 'react-router-dom';

interface NavItemProps {
  text: string;
  to: string;
  dropdown?: boolean;
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
      {props.text}
    </Link>
  );
}

export default NavItem;
