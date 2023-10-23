import React from 'react';
import { Button, Nav,ButtonGroup } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import SidebarData from '../sidebardata/SidebarData';
import Logo from '../../logo/Logo';
import { ToggleMobileSidebar, ChangeDarkMode } from '../../../store/customizer/CustomizerSlice';
import NavItemContainer from './NavItemContainer';
import NavSubMenu from './NavSubMenu';

const Sidebar = () => {
  const location = useLocation();
  const currentURL = location.pathname.split('/').slice(0, -1).join('/');

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector((state) => state.customizer.sidebarBg);
  const isFixed = useSelector((state) => state.customizer.isSidebarFixed);
  const dispatch = useDispatch();

  const isDarkMode = useSelector((state) => state.customizer.isDark);

  return (
    <div className={`sidebarBox shadow bg-${activeBg} ${isFixed ? 'fixedSidebar' : ''}`}>
      <SimpleBar style={{ height: '100%' }}>
        {/********Logo*******/}
        <div className="d-flex p-3 align-items-center">
          <Logo />
          <span className='d-sm-block d-lg-none'>
          <Button
            close
            size="sm"
            className="ms-auto "
            onClick={() => dispatch(ToggleMobileSidebar())}
          />
          </span>
        </div>
         {/********Cambiar a modo obscuro*******/}
         <div className="p-3 pt-1 mt-2 text-center">
        <h6 style={{ color: 'white' }}>Tema</h6>
              <ButtonGroup>
                <Button
                  outline={!!isDarkMode}
                  color="info"
                  size="sm"
                  onClick={() => dispatch(ChangeDarkMode(false)) && window.location.reload(false)}
                >
                  Light
                </Button>
                <Button
                  color="info"
                  size="sm"
                  outline={!isDarkMode}
                  onClick={() => dispatch(ChangeDarkMode(true))}
                >
                  Dark
                </Button>
              </ButtonGroup>
        </div>
        {/********Sidebar Content*******/}
        <div className="p-3 pt-1 mt-2">
          <Nav vertical className={activeBg === 'white' ? '' : 'lightText'}>
            {SidebarData.map((navi) => {
              if (navi.caption) {
                return (
                  <div className="navCaption text-uppercase mt-4" key={navi.caption}>
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={location.pathname === navi.href ? 'activeLink' : ''}
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
