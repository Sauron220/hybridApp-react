import React, { Component } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import DocumentTitle from 'react-document-title'
import { md5Data, i18n } from 'libs/tools';
import baseUrl from '_conf';
import { Grid } from 'component';
import styles from 'assets/scss/mine/help.scss';

@connect(({ help }) => ({ help }))
class Help extends Component {

  queryCrmHelp = (newQuery = {}) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'help/queryCrmHelp',
      payload: {
        keycode: md5Data(),
        ...newQuery,
      }
    })
  };

  componentDidMount() {
    this.queryCrmHelp()
  }

  get gridProps() {
    const { help } = this.props;
    const dataSource = help.typeList.map((v) => ({ ...v, label: v.name, icon: `${baseUrl.H5BaseUrl}a/crm/crmHelpIcon/imagequery?fileName=${v._id}` })).sort((a, b) => a.order - b.order);

    return {
      dataSource,
      onClick(v) {
        Router.push(`/mine/help/list?name=${v.label}`)
      },
      hasLine: false,
    }
  }

  render () {
    const title = i18n('Type of problem');
    return (
      <DocumentTitle title={title}>
        <div className={styles.wrap}>
          <Grid {...this.gridProps} />
        </div>
      </DocumentTitle>
    )
  }
}

export default Help;
