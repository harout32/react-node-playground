import React , { PureComponent } from 'react';

import { Layout, Icon } from 'antd';
const { Header, Content } = Layout;

import { SideNavComponent } from '../../components'
import { DashboardRouter } from '../../routers';

import './index.scss';
import { RouteComponentProps } from 'react-router-dom';

import { State } from '../../models';
import { connect } from 'react-redux';


interface Props extends RouteComponentProps {
  
}
export class Dashboard extends PureComponent <Props> {
    state = {
        collapsed: false,
      };
      navigate = (path: string) => {
        // this.props.history.replace(path);
        // this.props.history.push(path);

      };
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }

    render() {
        return (
            <Layout style={{'height': '100vh'}}>
              <SideNavComponent collapsed={this.state.collapsed} navigate={this.navigate}/>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Icon
                  className="main-dashboard-trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{
            margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
          }}
              >
                <DashboardRouter />
              </Content>
            </Layout>
          </Layout>
        )
    }
}
const mapStateToProps = (state: State) => ({
});
export const DashboardPage = connect(mapStateToProps, null)(Dashboard)
