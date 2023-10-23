import { Button, Col, ButtonGroup, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';
import {
  ChangeDirection,
  ChangeDarkMode,
  ToggleTopbar,
  FixedSidebar,
  ToggleHorizontal,
} from '../../store/customizer/CustomizerSlice';

const Customizer = ({ className }) => {
  const dispatch = useDispatch();
  const direction = useSelector((state) => state.customizer.isRTL);
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const isSidebarFixed = useSelector((state) => state.customizer.isSidebarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  return (
    <aside className={`customizerSidebar shadow ${className}`}>
      <Row>
        <Col>
          <div className="p-3 border-bottom">
            <h5 className="mb-0">Theme Customizer</h5>
            <small>Customize & Preview in Real Time</small>
          </div>
          <SimpleBar style={{ height: 'calc(100vh - 85px)' }}>
            <div className="p-3">
              <br />
              <h6>Change Direction</h6>
              <ButtonGroup>
                <Button
                  outline={!!direction}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ChangeDirection(false))}
                >
                  LTR
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={!direction}
                  onClick={() => dispatch(ChangeDirection(true))}
                >
                  RTL
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <br />
              <h6>Change Mode</h6>
              <ButtonGroup>
                <Button
                  outline={!!isDarkMode}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ChangeDarkMode(false)) && window.location.reload(false)}
                >
                  Light
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={!isDarkMode}
                  onClick={() => dispatch(ChangeDarkMode(true))}
                >
                  Dark
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <h6>Change Layout</h6>
              <ButtonGroup>
                <Button
                  outline={!!LayoutHorizontal}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ToggleHorizontal(false))}
                >
                  Vertical
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={!LayoutHorizontal}
                  onClick={() => dispatch(ToggleHorizontal(true))}
                >
                  Horziontal
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <br />
              <h6>Topbar Type</h6>
              <ButtonGroup>
                <Button
                  outline={topbarFixed === false}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ToggleTopbar(false))}
                >
                  Static
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={topbarFixed === true}
                  onClick={() => dispatch(ToggleTopbar(true))}
                >
                  Fixed
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <h6>Sidebar Type</h6>
              <ButtonGroup>
                <Button
                  outline={isSidebarFixed === false}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(FixedSidebar(false))}
                >
                  Static
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={isSidebarFixed === true}
                  onClick={() => dispatch(FixedSidebar(true))}
                >
                  Fixed
                </Button>
              </ButtonGroup>
            </div>
          </SimpleBar>
        </Col>
      </Row>
    </aside>
  );
};
Customizer.propTypes = {
  className: PropTypes.string,
};
export default Customizer;
