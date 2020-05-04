import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';

const Direction = ({ azimuth }) => {
  if (azimuth > 0 && azimuth <= 90) {
    return <div className="Direction__arrow Direction__arrow-right" />;
  }
  if (azimuth > 90 && azimuth <= 180) {
    return <div className="Direction__arrow Direction__arrow-down" />;
  }
  if (azimuth > 180 && azimuth <= 270) {
    return <div className="Direction__arrow Direction__arrow-left" />;
  }
  return <div className="Direction__arrow Direction__arrow-up" />;
};

const TabRoute = ({ info }) => (

  <div className="TabRoute">
    <div className="TabRoute__table_container TabRoute__table-scroll">
      <Table hover responsive>
        <thead>
          <tr>
            <th>{' '}</th>
            <th>Street</th>
            <th>Direction</th>
            <th>Length</th>
            <th>Time</th>
            {/* <th>Calories</th> */}
          </tr>
        </thead>
        <tbody>
          {info.map((i, index) => (
            <tr key={i.seq}>
              <th scope="row">{i.seq}</th>
              <td>{i.name || '-'}</td>
              <td>
                <Direction
                  azimuth={
                      parseFloat(index === 0 ? i.azimuth : i.azimuth - info[index - 1].azimuth, 10)
                }
                />
              </td>
              <td>{i.length}</td>
              <td>{moment().seconds(i.the_time).format('mm:ss:SS')}</td>
              {/* <td>-</td>     */}
            </tr>
          ))}
        </tbody>

      </Table>
    </div>

  </div>


);
TabRoute.propTypes = {
  info: PropTypes.arrayOf(PropTypes.shape({})),
};

TabRoute.defaultProps = {
  info: [],
};

Direction.propTypes = {
  azimuth: PropTypes.number.isRequired,
};

export default TabRoute;
