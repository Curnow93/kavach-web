import React from 'react';
import { Layout, Card } from 'antd';
import { withRouter } from 'react-router-dom';
import Sidebar from '../components/GlobalNav/Sidebar';
import Header from '../components/GlobalNav/Header';
import './basic.css';
import { useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';

function BasicLayout(props) {
  const { location } = props;
  const { Footer, Content } = Layout;
  const { children } = props;
  const { navTheme } = useSelector((state) => state.settings);

  return (
    <Layout hasSider={true}>
      <Sidebar navTheme={navTheme} />
      <Layout>
        <Header />
        <Content className="layout-content">
          <PageHeader location={location} />
          <Card className="wrap-children-content">{children}</Card>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default withRouter(BasicLayout);
