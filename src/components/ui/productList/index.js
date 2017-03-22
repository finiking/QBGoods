import React, { Component } from 'react'
import { connect } from 'dva'
import CSSModules from 'react-css-modules'
import styles from './index.less'
import { Link } from 'react-router'
import classNames from 'classnames'
import { priceFormat,baoquanFormat } from 'libs/util'

class ProductList extends Component {
    icons  =  {
                'tmall':  require('static/imgs/thirdSource/tmall.png'),
                'dangdang':  require('static/imgs/thirdSource/dangdang.png'),
                'gome':  require('static/imgs/thirdSource/gome.png'),
                'jd':  require('static/imgs/thirdSource/jd.png'),
                'jumei':  require('static/imgs/thirdSource/jumei.png'),
                'kaola':  require('static/imgs/thirdSource/kaola.png'),
                'mi':  require('static/imgs/thirdSource/mi.png'),
                'taobao':  require('static/imgs/thirdSource/taobao.png'),
                'yhd':  require('static/imgs/thirdSource/yhd.png'),
                'yougou': require('static/imgs/thirdSource/yougou.png'),
                'qbao':  require('static/imgs/thirdSource/qbao.png'),
        }
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div styleName={classNames({"list":true,"nomore":this.props.listConfig.isNoMore})}>
                {
                    this.props.listData.length > 0 ?
                        this.props.listConfig.temp == 'similar' ?
                            this.props.listData.map((item, index) =>
                                <div styleName="item" key={index}>
                                    <a {...this.eventFun(item,index)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
                                    <a {...this.eventFun(item,index)} href={item.url} ><h3>{item.name}</h3></a>
                                    <div styleName="price">￥{priceFormat(item.finalPrice)}
                                        <span styleName="icon"><img src={this.icons[item.source]} alt=""/></span>
                                    </div>
                                    <div styleName="bottom">
                                        <span styleName="return">{item.rebateValue}</span>
                                        {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                                        <a {...this.eventFun(item,index,8)} href={`newTab://goodstuff.qbao.com/similar?pid=${item.id}`}><span styleName="similar">找相似</span></a>
                                    </div>
                                </div>
                            )
                    : this.props.listConfig.temp == 'score' ?
                        this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a {...this.eventFun(item,index)} styleName="img" href={item.haohuoUrl} ><img src={item.imgUrl} alt="" /></a>
                                <a {...this.eventFun(item,index)} href={item.haohuoUrl} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{baoquanFormat(item.viewPrice)}
                                    <span styleName="icon"><img src={this.icons[item.source]} alt=""/></span>
                                </div>
                                <div styleName="bottom score">
                                    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
                                    <div styleName="tip">
                                        <a {...this.eventFun(item,index,3)} href={item.haohuoUrl} ><div styleName="haohuoScore">{item.haohuoScore}</div></a>
                                    </div>
                                </div>
                            </div>
                        )
                    : this.props.listConfig.temp == 'activity' ?
                        this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a {...this.eventFun(item,index)} styleName="img" href={item.haohuoUrl} ><img src={item.imgUrl} alt="" /></a>
                                <a {...this.eventFun(item,index)} href={item.haohuoUrl} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.viewPrice)}
                                    <span styleName="icon"><img  src={this.icons[item.source]}  alt="" /></span>
                                </div>
                                <div styleName="bottom score">
                                    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
                                    <div styleName="tip">
                                        <a href={item.haohuoUrl} ><div styleName="haohuoScore">{item.haohuoScore}</div></a>
                                    </div>
                                </div>
                            </div>
                        )

                    : this.props.listConfig.temp == 'hots' ?
                            this.props.listData.map((item, index) =>
                              <div styleName="item" key={index}>
                                  <a {...this.eventFun(item,index)} styleName="img" href={item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
                                  <a {...this.eventFun(item,index)} href={item.linkUrl} ><h3>{item.name}</h3></a>
                                  <div styleName="price">￥{priceFormat(item.finalPrice)}
                                      <span styleName="icon"><img src={this.icons[item.source]} alt=""/></span>
                                  </div>
                                  <div styleName="bottom">
                                      <span styleName="return">{item.rebateValue}</span>
                                      {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                                  </div>
                              </div>
                            )
                    : this.props.listData.map((item, index) =>
                            <div styleName="item" key={index}>
                                <a {...this.eventFun(item,index)} styleName="img" href={item.url} ><img src={item.imgUrl} alt="" /></a>
                                <a {...this.eventFun(item,index)} href={item.url} ><h3>{item.name}</h3></a>
                                <div styleName="price">￥{priceFormat(item.finalPrice)}
                                    <span styleName="icon"><img src={this.icons[item.source]} alt=""/></span>
                                </div>
                                <div styleName="bottom">
                                    <span styleName="return">{item.rebateValue}</span>
                                    {item.orderNum != null ? <p styleName="sales">销量 <span>{item.orderNum}</span></p> : ''}
                                </div>
                            </div>
                        )
                     : ''
                }
            </div>
        )
    }
    eventFun(item, index, stuffMoudId) {
        return {
            'data-event-stuffMoudId': stuffMoudId || this.props.eventConfig.stuffMoudId,
            'data-event-type': this.props.eventConfig.type,
            'data-event-id': item.id,
            'data-event-locationId': item.locationId || (index+1),
            'data-event-source': item.source,
            'data-event': 'point'
        }
    }
}
{/*<div styleName="item" key={index}>
    <a href={item.linkUrl} ><img src={item.imgUrl} alt="" /></a>
    <a href={item.linkUrl} ><h3>{item.name}</h3></a>
    <div styleName="price">￥{item.price}</div>
    <p styleName="sales">销量 <span>{item.saleCount}</span></p>
</div>*/}
function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(ProductList, styles, { allowMultiple: true }));
