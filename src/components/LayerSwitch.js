import React from 'react';

import { Switch } from 'antd';

import 'antd/lib/switch/style/css';

class LayerSwitch extends React.Component {
  render () {
    return (
      <div>
      <Switch defaultChecked onChange={this.props.onChange} />
      <span>{this.props.name}</span>
      </div>
    )
  }
}

export default LayerSwitch;