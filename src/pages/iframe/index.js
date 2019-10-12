import React, { Component } from 'react';
import { connect } from 'dva';
import { ActivityIndicator } from 'antd-mobile';
import ReactDOM from 'react-dom';
import styles from 'assets/scss/iframe/iframe.scss';

@connect(({ home }) => ({ home }))
class ActIframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iFrameHeight: '0px',
      animating: true,
    };
  }

  componentDidMount () {}

  render () {
    const { home: { activityUrl = '' } } = this.props;
    const { iFrameHeight, animating } = this.state;
    return (
      <div className={styles['activity-wrap']}>
        <iframe
          src={activityUrl}
          width={'100%'}
          height={iFrameHeight}
          frameBorder="0"
          onLoad={() => {
            const obj = ReactDOM.findDOMNode(this);
            this.setState({
              animating: false,
              iFrameHeight: `${obj.clientHeight}px`,
            });
          }}
        ></iframe>
        <ActivityIndicator
          toast
          text="Loading..."
          animating={animating}
        />
      </div>
    )
  }
}

export default ActIframe;
