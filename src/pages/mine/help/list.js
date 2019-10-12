import React, { Component } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import DocumentTitle from 'react-document-title'
import { md5Data, i18n } from 'libs/tools';
import { List } from 'component';
import Footer from './components/Footer';
import styles from 'assets/scss/mine/help.scss';

@connect(({ help }) => ({ help }))
class Help extends Component {

  queryCrmHelpQuestion = (newQuery = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'help/queryCrmHelpQuestion',
      payload: {
        keycode: md5Data(newQuery.name),
        ...newQuery,
      }
    })
  };

  componentDidMount() {
    const { location } = this.props;
    const { name } = location.query;
    this.queryCrmHelpQuestion({ name: name || 'Common' })
  }

  get listProps() {
    const { help } = this.props;
    const dataSource = help.questionList.slice(0, 5).map((v) => ({ ...v, label: v.title }))

    return {
      dataSource,
      onClick(v) {
        Router.push(`/mine/help/${v._id}`)
      },
    }
  }

  render () {
    const { location } = this.props;
    const { name } = location.query;
    const title = name || i18n('Help Center');
    return (
      <DocumentTitle title={title}>
        <div className={styles.wrap}>
          <List {...this.listProps} />
          <Footer isFixed to={`/mine/suggestion/feedback?feedbackSource=${title}`} />
        </div>
      </DocumentTitle>
    )
  }
}

export default Help;
