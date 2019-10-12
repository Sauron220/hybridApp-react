import React, { Component } from 'react';
import { connect } from 'dva';
import { md5Data, i18n } from 'libs/tools';
import styles from 'assets/scss/mine/help.scss';
import Footer from './components/Footer';

@connect(({ help }) => ({ help }))
class Help extends Component {

  queryCrmHelpAnswer = (newQuery = {}) => {
    const { dispatch, match } = this.props;
    const params = {
      ...match.params,
      ...newQuery,
    };
    dispatch({
      type: 'help/queryCrmHelpAnswer',
      payload: {
        keycode: md5Data(params.id),
        ...params,
      },
    })
  };

  componentDidMount() {
    this.queryCrmHelpAnswer()
  }

  render () {
    const { help } = this.props
    const { detail } = help
    return (
      <React.Fragment>
        <div className={styles.detail}>
          <div className={styles.title}>{detail.title}</div>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: detail.kmContent && detail.kmContent.content }}></div>
        </div>
        <Footer isFixed backgroundColor={'#fff'} to={`/mine/suggestion/feedback?feedbackSource=${detail.title}`} />
      </React.Fragment>
    )
  }
}

export default Help;
