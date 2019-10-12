import React, { Component } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { md5Data, i18n } from 'libs/tools';
import { List, Grid } from 'component';
import Filter from './components/Filter';
import Footer from './components/Footer';

const TYPE_DATA = [{
  icon: 'icons/Registration@2x.png',
  label: 'Registration',
}, {
  icon: 'icons/Credit@2x.png',
  label: 'Credit',
}, {
  icon: 'icons/Loan@2x.png',
  label: 'Loan',
}, {
  icon: 'icons/Repayment@2x.png',
  label: 'Repayment',
}, {
  icon: 'icons/Account@2x.png',
  label: 'Account',
}, {
  icon: 'icons/More@2x.png',
  label: 'More',
}];

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
    this.queryCrmHelpQuestion({ name: 'Common' })
  }

  get filterProps() {
    const { dispatch, help } = this.props;
    const { filter } = help;

    return {
      filter,
      onFilterChange: (value) => {
        dispatch({
          type: 'help/filter',
          payload: (filter.find((v) => v === value) ? filter : [value, ...filter]).slice(0, 2),
        });
        setTimeout(() => Router.push(`/mine/help/search?name=${value}`), 0)
      },
    }
  }

  get listProps() {
    const { help } = this.props;
    const dataSource = help.questionList.slice(0, 5).map((v) => ({ ...v, label: v.title }));

    return {
      title: i18n('Guess what you want to ask'),
      isMore: true,
      dataSource,
      onClick(v, isMore) {
        if (isMore) {
          Router.push(`/mine/help/list`);
          return
        }
        Router.push(`/mine/help/${v._id}`)
      },
    }
  }

  get gridProps() {
    const { help } = this.props;
    const dataSource = TYPE_DATA;

    return {
      title: i18n('Type of problem'),
      dataSource,
      onClick(v) {
        if (v.label === TYPE_DATA[TYPE_DATA.length - 1].label) {
          Router.push(`/mine/help/type`);
          return
        }
        Router.push(`/mine/help/list?name=${v.label}`);
      },
      hasLine: false,
    }
  }

  render () {
    return (
      <React.Fragment>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <Grid {...this.gridProps} />
        <Footer to={`/mine/suggestion/feedback?feedbackSource=${i18n('Help Center')}`} />
      </React.Fragment>
    )
  }
}

export default Help;
