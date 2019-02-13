import React , { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

// import './index.scss';



export class SideNavComponent extends Component<{collapsed: boolean, navigate: (path: string) => void}> {

    render () {
        return (
            <Sider
            trigger={null}
            collapsible
            collapsed={this.props.collapsed}
          >
            <div className="main-dashboard-logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" onClick={() => this.props.navigate('/dashboard/roles')} >
              <Icon type="usergroup-add" />
              <span>Roles</span>
                <Link to="/dashboard/roles" className="link"></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span>nav 2</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span>nav 3</span>
              </Menu.Item>
            </Menu>
          </Sider>
        )
    }
}