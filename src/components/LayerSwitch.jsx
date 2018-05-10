import React from 'react';

import capitalize from 'lodash/capitalize';

import Switch from 'antd/lib/switch';

import 'antd/lib/switch/style/css';

class LayerSwitch extends React.Component {
  render () {
    return (
      <div className="ml2">
        <span className="ph2 fw7">{capitalize(this.props.name)}</span>
        {this.props.defaultChecked ?
          <Switch defaultChecked onChange={this.props.onChange} /> :
          <Switch onChange={this.props.onChange} />
        }
      </div>
    )
  }
}

export default LayerSwitch;