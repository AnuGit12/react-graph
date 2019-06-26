import React from 'react';
import { Table } from 'reactstrap';

import './style.css';

class TableComponent extends React.PureComponent {

  //setting color to table's row after clicking on any dot or selecting with lasso selector
  rowFunction = (i) => {
    if (_.includes(this.props.selected_row, i)) {
      return 'yellow'
    } else {
      return "white"
    }
  }

  render() {
    const { data } = this.props;

    return (
      <tbody>
      {
        !!data && data.map((numList, i) => (
          <tr key={i} style={{ backgroundColor: this.rowFunction(i) }}>
            <td style={{ backgroundColor: '#80bfff', fontSize: '12px' }} >{i}</td>
            {
              numList.map((num, j) =>
                <td style={{ padding: '2px', fontSize: '12px' }} key={j}>{num}</td>
              )
            }
          </tr>
        ))
      }
    </tbody>
    )
  }
}

export default TableComponent;