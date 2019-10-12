import React, { Component } from 'react';
import {Toast} from 'antd-mobile';
import SlideRuler from './plugin/slide-ruler';
import styles from 'assets/scss/activity/calculator.scss';

class Calculator extends Component {
  constructor(props){
    super(props);
    this.ruler = React.createRef();
    this.state = {
      numVal: '10,000',
      canvansInstance: null,
      mountObj: {
        '7days': {
          amount: '',
          principal: '',
          interest: ''
        },
        '14days': {
          amount: '',
          principal: '',
          interest: ''
        }
      }
    };

    this._renderSlideRuler = this._renderSlideRuler.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.handleValue = this.handleValue.bind(this);
    this.toastText = this.toastText.bind(this);
    this.formatNum = this.formatNum.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  formatNum (val) {
    return val && (Number(val)).toLocaleString()
  }

  changeValue (event) {
    const val = event.target.value;
    const tempVal = val && parseInt(val.replace(/,/g, ""), 10);
    let _pval = tempVal - tempVal % 100;
    let canvansInstance = this.state.canvansInstance;
    canvansInstance.updateCanvans({currentValue: _pval});

    if (!val) {
      canvansInstance.updateCanvans({currentValue: _pval});
      this.setState({ numVal: '10,000', });
      return
    }

    if (Number(tempVal) > 10000) {
      this.setState({ numVal: '10,000', });
      this.toastText('Maximum borrowing amount is 10000Peco.')
    } else if (Number(tempVal) < 2000) {
      this.setState({ numVal: '2,000', });
      this.toastText('Minimum borrowing amount is 2000 Peco.')
    } else {
      this.setState({ numVal: _pval.toLocaleString(), })
    }
  }

  _renderSlideRuler(currentValue) {
    return new SlideRuler (
      {
        el: this.ruler.current,
        maxValue: 10000,
        minValue: 2000,
        currentValue,
        canvasHeight: 80,
        divide: 10,
        handleValue: this.handleValue,
        precision: 100,
        heightDecimal: 20,
        heightDigit: 10,
        lineWidth: 1,
        fontSize: 16,
        fontColor: '#A1A1A1'
      }
    )
  }

  handleValue(value) {
    const data = this.state.mountObj
    data['7days']['amount'] = (value + value*(0.8/100)*7).toFixed(0);
    data['7days']['principal'] = value.toFixed(0);
    data['7days']['interest'] = (value*(0.8/100)*7).toFixed(0);
    data['14days']['amount'] = (value + value*(0.8/100)*14).toFixed(0);
    data['14days']['principal'] = value.toFixed(0);
    data['14days']['interest'] = (value*(0.8/100)*14).toFixed(0);
    this.setState({
      numVal: value.toLocaleString(),
      mountObj: data
    })
  }
  toastText (msg) {
    Toast.info(msg, 3);
  }
  handleChange(event) {
    this.setState({numVal: event.target.value});
  }

  componentDidMount() {
    this.setState({
      canvansInstance: this._renderSlideRuler(10000)
    })
  }

  render() {
    const trs = [];
    for( let key in this.state.mountObj) {
        trs.push(
          <tr key={key} className={ key === '7days' ? styles.trBtmBorder : '' }>
            <td>{key}</td>
            <td>{this.formatNum(this.state.mountObj[key].amount)}</td>
            <td>{this.formatNum(this.state.mountObj[key].principal)}</td>
            <td>{this.formatNum(this.state.mountObj[key].interest)}</td>
          </tr>
        )
    }
    return (
      <div className={styles.calculator}>
        <div className={styles['loan-amount-head']}>
            <div className={styles['title-amount']}>Loan Amount (PHP)</div>
            <div className={styles['input-warp']}>
              <input type="text" className={styles['input-con']} maxLength="6" value={this.state.numVal} onChange={this.handleChange}  onBlur={this.changeValue}/>
          </div>
        </div>

        <div ref={this.ruler} className={styles.mg20}></div>

        <div className={styles['calculator-result']}>
          <table style={{backgroundColor:'#fff'}} className={styles['cal-tab']}>
              <thead>
              <tr style={{backgroundColor:'#FBFBFB'}}>
                <th>Period</th>
                <th>Amount</th>
                <th>Principal</th>
                <th>Interest</th>
              </tr>
              </thead>
              <tbody>{trs}</tbody>
          </table>
        </div>

        <p className={styles['btm-text-desc']}>Remember, the rate you are offered may vary due to personal circumstances and loan
          amount.</p>
      </div>
    )
}

}

export default Calculator
