import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';

@connect(({ coupon }) => ({
  coupon
}))
class Coupon extends Component {

  changeName = (key) => {
    const { dispatch, coupon } = this.props;
    let tempArr = [...coupon.couponArr];
    tempArr.splice(key, 1, 90)

    dispatch({
      type: 'coupon/GetUserCouPonInfo',
      payload: {
        couponArr: tempArr
      }
    })
  };

  render() {
    const self = this;
    const { coupon } = this.props;
    return (
      <div>
        {
          coupon.couponArr.map((item, key) => (
            <React.Fragment key={key}>
              <WhiteSpace size="lg" />
              <WingBlank size='lg'>
                <Card>
                  <Card.Header
                    title={`${item}元优惠券`}
                    extra={<span onClick={() => self.changeName(key)}>点击</span>}
                  />
                  <Card.Body>
                    <div>这里是{item}元优惠券哦</div>
                  </Card.Body>
                  <Card.Footer content={'请及时使用'} extra={<span>有效期7日</span>} />
                </Card>
              </WingBlank>
            </React.Fragment>
          ))
        }
        <WhiteSpace size="lg" />
      </div>
    )
  }
}

export default Coupon;
