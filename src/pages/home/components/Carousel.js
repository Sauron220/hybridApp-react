import React, { Component } from 'react';
import router from 'umi/router';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Carousel } from 'antd-mobile';
import styles from 'assets/scss/home/home.scss';

class Carousels extends Component {
  constructor(props) {
    super(props);
  }

  goNextPage = (url) => {
    const { dispatch } = this.props;
    if (url && url.startsWith('http://') || url.startsWith('https://')) {
      dispatch({type: 'home/setActivityUrl', payload: { activityUrl: url }});
      router.push('/iframe');
    } else {
      url && router.push(url);
    }
  };

  renderImgItem = (banner, bottom) => {
    if (!banner.length) return null;
    return (
      banner.map((item, key) => (
        <div
          key={key}
          onClick={() => this.goNextPage(item.hrefUrl)}
        >
          <img
            className={classnames({ [styles[`banner`]]: !bottom, [styles[`bottom-banner`]]: bottom })}
            src={item.imgUrl}
            alt=""/>
        </div>
      ))
    )
  };

  render() {
    const { banner = [], bottom, ...restProps } = this.props;
    return (
      <div className={classnames({[styles['bottom-banner-wrap']]: bottom})}>
        {
          banner.length > 1 ? (
            <Carousel
              autoplay={true}
              dots={false}
              {...restProps}
              infinite
            >
              { this.renderImgItem(banner, bottom) }
            </Carousel>
          ) : (
            this.renderImgItem(banner, bottom)
          )
        }
      </div>
    );
  }
}

Carousels.defaultProps = {
  bottom: false,
};

Carousels.propTypes = {
  banner: PropTypes.array,
  bottom: PropTypes.bool,
};

export default Carousels;
