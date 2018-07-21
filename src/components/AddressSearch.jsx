
import React from 'react';
import AutoComplete from 'antd/lib/auto-complete';
import 'antd/lib/auto-complete/style/css';

class AddressSearch extends React.Component {
  state = {
    dataSource: [],
    value: ""
  }

  suggestAddress(value) {
    if(value !== '') {
      fetch(`https://gis.detroitmi.gov/arcgis/rest/services/DoIT/AddressPointGeocoder/GeocodeServer/suggest?text=${value}&f=pjson`)
      .then(r => r.json())
      .then(d => {
        this.setState({
          dataSource: d.suggestions.length < 1 ? [value] : d.suggestions.map(s => s.text)
        })
      })
    }
  }

  handleSearch = (value) => {
    this.suggestAddress(value)
    this.setState({value})
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