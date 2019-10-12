import React from 'react';
import classnames from 'classnames';

function Icon(props) {
  const { type, className, ...restProps } = props;
  return (
    <svg {...restProps} className={classnames("icon", className)} aria-hidden="true">
      <use xlinkHref={`#${type}`}></use>
    </svg>
  )
}

export default Icon;
