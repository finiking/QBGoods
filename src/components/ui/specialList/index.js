import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat, baoquanFormat, eventFun, icons, showSourceTip } from 'libs/util'
import SpecialToTip from '../specialToTip';
import PopUp from "components/popup/index";

class SpecialList extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }
    componentWillMount(){

    }
    clickLinkSource(url,source,e){
      PopUp.show(
              (<SpecialToTip source={source}  />),{maskClosable:true, isBgAlpha: true}
      );
        setTimeout(function(){
            if (QBFK.Util.getDevice() === 'android' && source == 'jd') {
                window.open(url);
            } else {
                window.location.href = 'newtab://goodstuff.qbao.com/goods?url=' + url;
            }
        PopUp.hide(
            (<SpecialToTip source={source} />), { maskClosable: false, isBgAlpha: false }
        );
      },1000);
      e.preventDefault();
    }
    render() {
        let { pageName, model } = this.props.eventConfig;
        let listTpl = "";

        switch (this.props.listConfig.temp) {
          case "frontMatter":
            listTpl = this.props.listData.map((item, index) =>
                <div styleName="item" key={index}>
                    {item.isNew && <i styleName="new-icon">NEW</i>}
                    <a {...eventFun(pageName, model, item.id)} styleName="img"  onClick={this.clickLinkSource.bind(this,item.url,item.source)}><img src={item.imgUrl} alt="" /></a>
                    <a {...eventFun(pageName, model, item.id)} href={item.url}  onClick={this.clickLinkSource.bind(this,item.url,item.source)}><h3>{item.name}</h3></a>
                    <div styleName="source">
                        <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                        <span className='estimate'>{item.rebateValue}</span>
                    </div>
                    {item.coupon ? <div styleName="price">券后￥{priceFormat(item.finalPrice - item.coupon.value)}</div> : <div styleName="price">￥{priceFormat(item.price)}</div>}
                    <div styleName="bottom">
                        {item.saleCount ? <p styleName="sales">销量 <span>{item.saleCount}</span></p> : ''}
                        {item.coupon ? <a {...eventFun(pageName, model, item.id)} href={item.coupon.link} className="couponlink"><p className="couponvalue">{item.coupon.value}</p><p className="couponunit">优惠券</p></a> : <a {...eventFun(pageName, model, item.id)} href={item.url}><span styleName="grab">马上抢</span></a>}
                    </div>
                </div>
            );
            break;
          case "beauty":
            listTpl = this.props.listData.map((item, index) =>
                <div styleName="singleitem" key={index}>
                    <a {...eventFun(pageName, model, item.id)} styleName="img" href={ item.url} onClick={this.clickLinkSource.bind(this,item.url,item.source)}><img src={item.imgUrl} alt="" /></a>
                    <div styleName="info">
                      <a {...eventFun(pageName, model, item.id)} href={item.url} onClick={this.clickLinkSource.bind(this,item.url,item.source)}><h3>{item.name}</h3></a>
                      <div styleName="source">
                          <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                          <span className='estimate'>预估返10%</span>
                      </div>
                      <div styleName="bottom">
                          <div styleName="price">
                            ￥{priceFormat(item.finalPrice)}
                            <p styleName="sales">销量 <span>{item.orderNum}</span></p>
                          </div>
                          <a {...eventFun(pageName, 'gather_goods_similar', item.id)} href={`newTab://goodstuff.qbao.com/similar?pid=${item.id}`}><span styleName="grab">马上抢</span></a>
                      </div>
                    </div>
                </div>
            );
            break;
            case "coupon":
              listTpl = this.props.listData.map((item, index) =>
                  <div styleName="couponitem" key={index}>
                      <a {...eventFun(pageName, model, item.id)} styleName="img" href={'newtab://goodstuff.qbao.com/goods?url=' + item.coupon.link}><img src={item.imgUrl} alt="" /></a>
                      <div styleName="info">
                        <a {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.coupon.link}><h3>{item.name}</h3></a>
                        <div styleName="source">
                            <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                            <span className='estimate'>{item.rebateValue}</span>
                        </div>
                        <div styleName="bottom">
                            <div styleName="price">
                                <p styleName="salestip">券后</p>
                                ￥{priceFormat((item.finalPrice - item.coupon.value) < -1 ? item.finalPrice : item.finalPrice - item.coupon.value)}
                                <p styleName="sales">销量 <span>{item.orderNum}</span></p>
                            </div>
                        </div>
                      </div>
                      <a {...eventFun(pageName, model, item.id)} href={'newtab://goodstuff.qbao.com/goods?url=' + item.coupon.link} >
                        <div className="coupon">
                          <p>领优惠券</p>
                          <p>{item.coupon.value}</p>
                        </div>
                      </a>
                  </div>
              );
              break;
          default:
            listTpl = this.props.listData.map((item, index) =>
                <div styleName="item" key={index}>
                    {item.isNew && <i styleName="new-icon">NEW</i>}
                    <a {...eventFun(pageName, model, item.id)} styleName="img"  onClick={this.clickLinkSource.bind(this,item.url,item.source)}><img src={item.imgUrl} alt="" /></a>
                    <a {...eventFun(pageName, model, item.id)} href={item.url}  onClick={this.clickLinkSource.bind(this,item.url,item.source)}><h3>{item.name}</h3></a>
                    <div styleName="source">
                        <span styleName="icon"><img src={icons[item.source]} alt=""/></span>
                        <span className='estimate'>{item.rebateValue}</span>
                    </div>
                    <div styleName="price">￥{priceFormat(item.finalPrice)}</div>
                    <div styleName="bottom">
                        {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                        <a {...eventFun(pageName, model, item.id)} href={item.url}><span styleName="grab">马上抢</span></a>
                    </div>
                </div>
            );
        }

        return (
            <div styleName={classNames({"list":true ,"nine": this.props.listConfig.temp==="nine" ,"beauty": this.props.listConfig.temp==="beauty", "frontMatter":  this.props.listConfig.temp==="frontMatter"})}>
                {
                    this.props.listData.length > 0 ? listTpl : ''
                }
            </div>
        )
    }
}
export default CSSModules(SpecialList, styles, { allowMultiple: true });
