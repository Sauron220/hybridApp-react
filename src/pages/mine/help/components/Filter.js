import React, { PureComponent } from 'react';
import classnames from 'classnames'
import { SearchBar } from 'antd-mobile';
import propTypes from 'prop-types';
import styles from './Filter.scss';

class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || '',
    }
  }

  onClick = (value, e) => {
    e.stopPropagation()
    this.onChange(value)
    this.onSubmit(value)
  }

  onChange = (value) => {
    this.setState({ value })
  }

  onSubmit = (value) => {
  	const { onFilterChange } = this.props
  	if (onFilterChange) {
  	  onFilterChange(value)
  	}
  }

  render () {
  	const { value } = this.state
  	const { filter = [], hide, start, defaultValue, ...restProps } = this.props
    return (
      <div className={classnames(styles.wrap, { [styles.start]: start })}>
      	<SearchBar
    		  value={value}
          placeholder={'Enter Keywords of Your Question'}
    		  onChange={this.onChange}
    		  onSubmit={this.onSubmit}
          {...restProps}
      	/>
      	{!hide && filter.length > 0 && <div className={styles.tags}>
	       {filter.map((v, i) => <div className={styles.tag} key={i} onClick={(e) => this.onClick(v, e)}>{v}</div>)}
      	</div>}
      </div>
    )
  }
}

Filter.propTypes = {
  filter: propTypes.array,
  onFilterChange: propTypes.func,
}

export default Filter;
