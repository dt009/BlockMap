/**
 * @author duantao
 * @file 筛选地点名称
 * @date 2018/7/27
 */

import React, {Component} from 'react';
import './FilterPlacePage.css';

import iconZhanKai from '../img/zhankai.svg';
import iconShouQi from '../img/shouqi.svg';


class FilterPlacePage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            icon: iconShouQi,
            isPageShow: true,
            placeList: [],
            selectedValue: ''
        }
    }
    
    componentDidMount() {
        let {dataList} = this.props;
        this.setState({
            placeList: dataList
        })
    }
    
    // 渲染展示的地点
    renderAddressListDon = () => {
        
        return this.state.placeList.map((item, index) => {
            return (
                <div key={index}>{item.title}</div>
            )
        })
    };
    
    // 确认过滤
    handleClickFilterBtn = () => {
        
        let {selectedValue} = this.state;
        let {dataList, getFilterList} = this.props;
        
        
        let list = [];
        if (selectedValue === '') {
            list = dataList;
        }
        else if (selectedValue === 'other') {
            list = dataList.filter(item => item.count > 3)
        }
        else {
            list = dataList.filter(item => item.count === Number(selectedValue))
        }
        
        getFilterList(list);
        
        this.setState({
            placeList: list
        })
    };
    
    // 获取选择的条件
    getSelectedValue = value => {
        
        this.setState({selectedValue: value});
        
    };
    
    // 侧边栏展示和隐藏
    handleToggleAside = () => {
        this.setState(prevState => {
            return {
                isPageShow: !prevState.isPageShow
            }
        })
    };
    
    render() {
        
        let {icon, isPageShow} = this.state;
        return (
            <aside
                className={`filter-place-page ${isPageShow ? '' : 'hide-box'}`}
                
            >
                <div className='show'>
                    <header>
                        <h2>
                            <span className='title-message'>筛选地点</span>
                            <img
                                className='header-icon'
                                onClick={this.handleToggleAside}
                                src={icon}
                                alt="点击收缩"
                            />
                        </h2>
                    </header>
                    <section>
                        <div className='input-box'>
                            <div className='input-address'>
                                <select
                                    onChange={e => this.getSelectedValue(e.target.value)}
                                    name="address"
                                    id="select-address"
                                    aria-label="the Number of"
                                >
                                    <option value="">全部</option>
                                    <option value="0">没有去过</option>
                                    <option value="1">去过一次</option>
                                    <option value="2">去过两次</option>
                                    <option value="3">去过三次</option>
                                    <option value="other">去过三次以上</option>
                                </select>
                            </div>
                            <button
                                className='filter-btn'
                                onClick={this.handleClickFilterBtn}
                            >确认过滤</button>
                        </div>
                        <div className='address-list'>
                            {this.renderAddressListDon()}
                        </div>
                    </section>
                </div>
                <div
                    className='hide'
                    style={{
                        display: isPageShow ? 'none' : 'block'
                    }}
                >
                    <img
                        className='header-icon'
                        src={iconZhanKai}
                        onClick={this.handleToggleAside}
                        alt="点击展开"
                    />
                </div>
            </aside>
        )
    }
}

export default FilterPlacePage;