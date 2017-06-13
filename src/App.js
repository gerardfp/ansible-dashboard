import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import logo from './logo.svg';
import './App.css';

injectTapEventPlugin();

class App extends Component {
  constructor(){
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount(){
    for(let i=1; i<=5; i++){
      fetch('ansible-facts/ansible' + i + '.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ data: this.state.data.concat([json])});
      });
    }
  }

  render() {
    var rows = this.state.data.map((content, idx) => {
      return (
              <TableRow key={idx}>
                <TableRowColumn>{content.ansible_facts.ansible_nodename}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_all_ipv4_addresses[0]}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_default_ipv4.macaddress}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_bios_version}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_devices.sda.model}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_devices.sda.size}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_devices.sr0.model}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_devices.sr0.size}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_processor_cores}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_processor[0]}</TableRowColumn>
                <TableRowColumn>{content.ansible_facts.ansible_distribution}</TableRowColumn>
              </TableRow>
      );
    });

    return (      
    <MuiThemeProvider>
        <div>
          <AppBar
          title="ElPuig Ansible"
          iconClassNameRight="muidocs-icon-navigation-expand-more" />

          <Table style={{ tableLayout: 'auto'}} fixedHeader={false}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Node Name</TableHeaderColumn>
                <TableHeaderColumn>IP Address</TableHeaderColumn>
                <TableHeaderColumn>Mac Address</TableHeaderColumn>
                <TableHeaderColumn>BIOS</TableHeaderColumn>
                <TableHeaderColumn>SDA Model</TableHeaderColumn>
                <TableHeaderColumn>SDA Size</TableHeaderColumn>
                <TableHeaderColumn>SR0 Model</TableHeaderColumn>
                <TableHeaderColumn>SR0 Size</TableHeaderColumn>
                <TableHeaderColumn>Cores</TableHeaderColumn>
                <TableHeaderColumn>Processors</TableHeaderColumn>
                <TableHeaderColumn>OS</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </div>
      </MuiThemeProvider>

);
  }
}

export default App;
//$data->ansible_distribution," ",$data->ansible_distribution_release," ",$data->ansible_distribution_version,"