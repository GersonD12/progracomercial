import React from 'react';
import { useSelector, /* useDispatch */ } from 'react-redux';
import Cookies from 'js-cookie';
/* import { Link } from 'react-router-dom'; */
/* import SimpleBar from 'simplebar-react'; */
import { useNavigate  } from 'react-router-dom';
import {
  Navbar,
  /* Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input, */
  Button,
} from 'reactstrap';
/* import * as Icon from 'react-feather';
//import { ReactComponent as LogoWhite } from '../../assets/images/logos/white-logo-icon.svg';
import { ReactComponent as Logo } from '../../assets/images/logos/Meshop2.svg';
import MessageDD from './MessageDD';
import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
import user1 from '../../assets/images/users/user4.jpg';

import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';  */

const Header = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  /* const dispatch = useDispatch(); */
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar token
    Cookies.remove('authToken');
    Cookies.remove('username');
    Cookies.remove('userId');
    // Ir a login
    navigate('/auth/loginformik');
  };

  return (
    <Navbar
      color={topbarColor}
      dark={!isDarkMode}
      light={isDarkMode}
      expand="lg"
      className="topbar bg-gradient"
    >
      <br></br>
      <div >
        <Button color="danger" size="sm" className="ml-auto" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      {/* <div className="d-flex align-items-center">
        <Button
          color={topbarColor}
          className="d-none d-lg-block mx-1  hov-dd border-0"
          onClick={() => dispatch(ToggleMiniSidebar())}
        >
          <Icon.ArrowLeftCircle size={18} />
        </Button>
        <NavbarBrand className="d-sm-block d-lg-none">
          <Logo />
        </NavbarBrand>
        <Button
          color={topbarColor}
          className="d-sm-block d-lg-none  hov-dd border-0 mx-1"
          onClick={() => dispatch(ToggleMobileSidebar())}
        >
          <i className="bi bi-list" />
        </Button>
      </div>
      <Nav className="me-auto d-flex flex-row align-items-center" navbar>
        <UncontrolledDropdown className="mx-1 hov-dd">
          <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
            <Icon.MessageSquare size={18} />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <DropdownItem header>
              <span className="mb-0 fs-5">Notifications</span>
            </DropdownItem>
            <DropdownItem divider />
            <SimpleBar style={{ maxHeight: '350px' }}>
              <NotificationDD />
            </SimpleBar>
            <DropdownItem divider />
            <div className="p-2 px-3">
              <Button color="primary" size="sm" block>
                Check All
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown className="mx-1 hov-dd">
          <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
            <Icon.Mail size={18} />
          </DropdownToggle>
          <DropdownMenu className="ddWidth">
            <DropdownItem header>
              <span className="mb-0 fs-5">Messages</span>
            </DropdownItem>
            <DropdownItem divider />
            <SimpleBar style={{ maxHeight: '350px' }}>
              <MessageDD />
            </SimpleBar>
            <DropdownItem divider />
            <div className="p-2 px-3">
              <Button color="primary" size="sm" block>
                Check All
              </Button>
            </div>
          </DropdownMenu>
        </UncontrolledDropdown>

        <UncontrolledDropdown className="mega-dropdown mx-1 hov-dd">
          <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
            <Icon.Grid size={18} />
          </DropdownToggle>
          <DropdownMenu>
            <MegaDD />
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavItem className="d-md-block d-none">
          <Link to="/about" className={`nav-link ${topbarColor === 'white' ? 'text-dark' : ''}`}>
            About
          </Link>
        </NavItem>
      </Nav>
      <div className="d-flex" >
        <Input
          type="search"
          placeholder="Search"
          className="rounded-pill d-md-block d-none my-1 border-0"
        ></Input>
        <UncontrolledDropdown className=" hov-dd">
        <div className="ml-auto">
          <Button color="danger" size="sm">
            Logout
          </Button>
        </div>
         <DropdownToggle color="transparent">
            <img src={user1} alt="profile" className="rounded-circle" width="30" />
          </DropdownToggle>
          <DropdownMenu className="ddWidth profile-dd">
            <div className="p-2 px-3">
              <Button color="danger" size="sm">
                Logout
              </Button>
            </div>
          </DropdownMenu>
         </UncontrolledDropdown>
      </div> */}
    </Navbar>
  );
};

export default Header;
