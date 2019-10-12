import React from 'react';

function HOCondition(WrapComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
    }

    renderCom = () => {
      const { form, condition } = this.props;
      const { getFieldValue } = form;
      const conditionParams = condition.split(',');
      const conditionKey = conditionParams[0];
      const conditionTarget = conditionParams[1];
      const isShow = getFieldValue(conditionKey) && (getFieldValue(conditionKey)[0] === conditionTarget);
      if (conditionTarget) {
        if (isShow)
          return <WrapComponent {...this.props} />;
        else
          return <></>;
      } else {
        return <WrapComponent {...this.props} />;
      }
    };

    render() {
      return this.renderCom();
    }
  }
}

export default HOCondition;
