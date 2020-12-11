import React from 'react';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';
import {WebSocketConfig} from "app/utils/web-socket-config";

export class WebsocketGrid extends React.Component {
  webSocket: WebSocketConfig;
  columns;
  data;

  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'column1',
        dataIndex: 'c1',
        key: 'c1',
        render: text => <a>{text}</a>
      },
      {
        title: 'column2',
        dataIndex: 'c2',
        key: 'c2',
        render: text => <a>{text}</a>
      },
      {
        title: 'column3',
        dataIndex: 'c3',
        key: 'c3'
      },
      {
        title: 'column4',
        key: 'c4',
        dataIndex: 'c4',
        render: c4 => (
          <Tag color={c4 ? 'red' : 'lightgreen'}>
            <i className="fal fa-bars" />
          </Tag>
        )
      },
      {
        title: 'Action',
        key: 'c5',
        render: c5 => (
          <Tag color={c5 ? 'red' : 'lightgreen'}>
            <i className="far fa-sliders-h" />
          </Tag>
        )
      }
    ];
    this.webSocket = new WebSocketConfig();
  }

  componentDidMount(): void {
    this.webSocket.receiveDataCallBack = activity => {
      console.log(activity);
      this.data = activity;
      this.forceUpdate();
    };
    this.webSocket.connect();
  }

  setDirection(isRtl: boolean): void {}

  render(): React.ReactElement | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
    return (
      <div style={{ direction: 'ltr' }}>
        <Table columns={this.columns} dataSource={this.data} />
      </div>
    );
  }
}


