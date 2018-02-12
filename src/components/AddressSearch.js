
import React from 'react';
import { AutoComplete } from 'antd';
import 'antd/lib/auto-complete/style/css';
import _ from 'lodash';

class AddressSearch extends React.Component {
  state = {
    dataSource: [],
  }

  suggestAddress(value) {
    if(value !== '') {
      fetch(`https://gis.detroitmi.gov/arcgis/rest/services/DoIT/AddressPointGeocoder/GeocodeServer/suggest?text=${value}&f=pjson`)
      .then(r => r.json())
      .then(d => {
        this.setState({
          dataSource: !value ? [] : _.map(d.suggestions, 'text')
        })
      })
    }
  }

  handleSearch = (value) => {
    this.suggestAddress(value)
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="pa2">
        <AutoComplete
          dataSource={dataSource}
          style={{ width: '300px' }}
          onSelect={this.props.onSelect}
          onSearch={this.handleSearch}
          placeholder="Search for an address..."
        />
      </div>
    );
  }
}

export default AddressSearch;