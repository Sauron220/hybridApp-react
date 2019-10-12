import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImagePicker } from 'antd-mobile';
import { PhotoSwipe } from 'react-photoswipe';
import lrz from 'lrz';
import 'react-photoswipe/lib/photoswipe.css';

class Photoswipe extends Component {
  state = {
    isOpen: false,
    items: [],
    options: {
      closeOnScroll: true,
      loop: true,
      shareEl: false,
      fullscreenEl: false,
      tapToToggleControls: false,
      captionEl: false,
      tapToClose: true,
    },
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  onChange = async (files) => {
    let fourLimitArr = files.splice(0, 4);
    fourLimitArr
      .map(item => {
        if (item.file.size / 1024 / 1024 > 2) {
          lrz(item.file, { quality: 0.65 })
            .then(rst => {
              const { base64 } = rst;
              item.url = base64;
            });
        } else {
          return item;
        }
      });
    const items = await Promise.all(fourLimitArr.map(async item => {
      let img = new Image();
      let w = img.naturalWidth;
      let h = img.naturalHeight;
      img.src= item.url;
      const calcWH = await new Promise(resolve => {
        img.onload = () => {
          w = img.width;
          h = img.height;
          resolve({w, h});
        }
      });
      return {
        src: item.url,
        title: item.file.name,
        ...calcWH,
      }
    }));
    this.setState({ items, });
    this.props.onChange({ files: fourLimitArr, });
  };

  render () {
    const { files, multiple, limit } = this.props;
    const { isOpen, items, options } = this.state;
    return (
      <>
        <ImagePicker
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => this.setState({isOpen: true, options: {...options, index}})}
          selectable={files.length < limit}
          multiple={multiple}
          accept={'image/png,image/jpg,image/jpeg'}
        />
        <PhotoSwipe
          isOpen={isOpen}
          items={items}
          options={options}
          onClose={this.handleClose}
        />
      </>
    )
  }
}

Photoswipe.defaultProps = {
  files: [],
  limit: 0,
};

Photoswipe.propTypes = {
  files: PropTypes.array,
  limit: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Photoswipe;
