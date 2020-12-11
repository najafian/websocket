import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import { Observable } from 'rxjs';

export class WebSocketConfig {
  stompClient = null;

  subscriber = null;
  connection: Promise<any>;
  connectedPromise: any = null;
  listener: Observable<any>;
  listenerObserver: any;
  alreadyConnectedOnce = false;

  receiveDataCallBack: any;

  createConnection(): Promise<any> {
    return new Promise((resolve, reject) => (this.connectedPromise = resolve));
  }

  createListener(): Observable<any> {
    return new Observable(observer => {
      this.listenerObserver = observer;
    });
  }

  sendActivity() {
    this.connection.then(() => {
      this.stompClient.send(
        '/topic/activity', // destination
        JSON.stringify({ page: window.location.hash }), // body
        {} // header
      );
    });
  }

  subscribe() {
    this.connection.then(() => {
      this.subscriber = this.stompClient.subscribe('/topic/tracker', data => {
        console.log(data);
        this.listenerObserver.next(JSON.parse(data.body));
      });
    });
  }

  connect() {
    if (this.connectedPromise !== null || this.alreadyConnectedOnce) {
      // the connection is already being established
      return;
    }
    this.connection = this.createConnection();
    this.listener = this.createListener();

    // building absolute path so that websocket doesn't fail when deploying with a context path
    const loc = window.location;
    const baseHref = document
      .querySelector('base')
      .getAttribute('href')
      .replace(/\/$/, '');

    const headers = {};
    let url = '//' + loc.host + baseHref + '/websocket/tracker';
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

    this.stompClient.connect(headers, () => {
      this.connectedPromise('success');
      this.connectedPromise = null;
      this.subscribe();
      this.sendActivity();
      if (!this.alreadyConnectedOnce) {
        window.onhashchange = () => {
          this.sendActivity();
        };
        this.alreadyConnectedOnce = true;
      }
    });
    this.receive().subscribe(activity => {
      if (this.receiveDataCallBack) {
        this.receiveDataCallBack(activity);
      }
    });
  }

  disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
      this.stompClient = null;
    }
    window.onhashchange = () => {};
    this.alreadyConnectedOnce = false;
  }

  receive(): Observable<any> {
    return this.listener;
  }

  unsubscribe() {
    if (this.subscriber !== null) {
      this.subscriber.unsubscribe();
    }
    this.listener = this.createListener();
  }
}
