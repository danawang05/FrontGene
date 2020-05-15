import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form, Icon } from 'antd';
import searchTwo from '../../sources/searchTwo.png'
import ceshi from '../../sources/ceshi.jpeg'
import i_select from '../../sources/zhuan.png'
import { Picker, Popover, ActivityIndicator, Toast, List, Drawer, PullToRefresh } from 'antd-mobile';
import { GENE_TYPE, SAMPLE_TYPE, CANCER_SPECIES } from "../../actions/config"

import SearchBar from '../../components/SearchBar'
import './index.scss';
import GoodList from '../../components/GoodsList'
import DocGoodList from '../../components/DocGoodList'
import SelectSearch from '../../components/SelectSearch'
import * as actions from './../../actions';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;
const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

/* Populated by react-webpack-redux:reducer */
class oneClickOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bnt: 1,
      content: ["", "", ""],
      pickerValue: [],
      visibles: false,
      selected: '',
      animating: false,
      text: '',
      sValue: {},
      search: {
        name: '',
        company: '',
        geneType: '',
        type: '',
        cancerType: '',
        orderBy: ''
      },
      page: 1,
      limit: 9999,
      total: 0,
      data: []
    }
  }
  componentWillReceiveProps(nextprops) {
    if (this.props.getGenelistState != nextprops.getGenelistState && nextprops.getGenelistState == 'succ') {
      this.setState({
        animating: false
      })
      const { data } = this.state
      let newArr = data.concat(nextprops.geneList.list)
      console.log(newArr, nextprops.geneList.list)
      this.setState({
        animating: false,
        total: nextprops.geneList.total,
        data: newArr
      })
    }
    if (this.props.getGenelistState != nextprops.getGenelistState && nextprops.getGenelistState == 'failed') {
      this.setState({
        animating: false
      })
      Toast.fail(nextprops.msg, 2)
    }
  }
  componentWillMount() {
    const { actions } = this.props
    this.setState({
      text: '获取套餐',
      animating: true,
      docked: this.props.isSearch
    })
    actions.genepackPage({
      page: 1,
      limit: 9999,
      ...this.state.search
    })
    if (sessionStorage.getItem('gene_user_type') == '0') {
      actions.isShouCangs({})
    }

  }
  componentDidMount() {

  }
  changeBnt(bnt) {
    const { actions } = this.props
    const { limit } = this.state
    if (bnt == 1) {
      actions.genepackPage({
        page: 1,
        limit,
        ...this.state.search
      })
      this.setState({
        page: 1
      })
    }
    if (bnt == 2) {
      if (sessionStorage.getItem('gene_user_type') == '0') {
        actions.ShouCangsPackage({
          orderby:0
        })
      } else {
        actions.searchIsTop({
          orderby:0
        })
      }

    }
    this.setState({
      bnt: bnt
    })
  }
  goDetal(id) {
    this.props.history.push(`/detail/${id}`)
  }
  onSelect = (opt) => {
    this.setState(Object.assign(this.state.search, { ['orderBy']: opt.props.value }))
    this.setState({ visibles: false })
    let param = this.state.search
    param['orderBy'] = opt.props.value
    const { actions } = this.props
    const { limit ,bnt} = this.state
    if (bnt == 2) {
      if (sessionStorage.getItem('gene_user_type') == '0') {
        actions.ShouCangsPackage({
          name:this.state.search.name,
          orderby:opt.props.value||0
        })
      } else {
        actions.searchIsTop({
          name:this.state.search.name,
          orderby:opt.props.value||0
        })
      }

    }else{
      actions.genepackPage({
        page: 1,
        limit,
        ...param
      })
      this.setState({
        page: 1
      })
    }
   
  };
  handleVisibleChange = (visibles) => {
    // this.setState({
    //     visibles,
    // });
  };
  changeVis() {
    this.setState({
      visibles: !this.state.visibles
    })
  }
  openSearch = () => {
    this.setState({
      docked: !this.state.docked
    })
  }
  changeSearch = (key, e) => {
    let item = e
    if (key == 'name') {
      item = e.target.value
    }
    this.setState(Object.assign(this.state.search, { [key]: item }))
  }
  search = () => {
    const { actions } = this.props
    const { limit,bnt } = this.state
    if(bnt == 1){
      actions.genepackPage({
        page: 1,
        limit,
        ...this.state.search
      })
      this.setState({
        page: 1
      })
    }else{
      if (sessionStorage.getItem('gene_user_type') == '0') {
        actions.ShouCangsPackage({
          name:this.state.search.name
        })
      } else {
        actions.searchIsTop({
          name:this.state.search.name
        })
      }
    }
    
    
  }
  selectSearch(type, v) {
    this.setState(Object.assign(this.state.search, { [type]: v }))
    let param = this.state.search
    param[type] = v
    const { actions } = this.props
    const { limit } = this.state
    actions.genepackPage({
      page: 1,
      limit,
      ...param
    })
    this.setState({
      page: 1
    })
  }
  getMore = () => {
    const { actions } = this.props
    const { page, total, limit } = this.state
    let param = this.state.search
    if (total > page * limit) {
      let newPage = page + 1
      actions.genepackPage({
        page: newPage,
        limit,
        ...param
      })
      this.setState({
        page: newPage
      })
    }
  }
  render() {
    const { setting, search, geneCompany, shouCangArr, shouCangArrList, searchTop } = this.props
    let select1 = [[]]
    select1[0].push({ label: '全部', value: '' })
    setting[GENE_TYPE] && setting[GENE_TYPE].map((v) => {
      select1[0].push({ label: v.dictName, value: v.dictName })
    })
    let select2 = [[]];
    select2[0].push({ label: '全部', value: '' })
    setting[SAMPLE_TYPE] && setting[SAMPLE_TYPE].map((v) => {
      select2[0].push({ label: v.dictName, value: v.dictName })
    })
    let select3 = [[]];
    select3[0].push({ label: '全部', value: '' })
    geneCompany && geneCompany.map((v) => {
      select3[0].push({ label: v.name, value: v.name })
    })
    let select4 = [[]];
    select4[0].push({ label: '全部', value: '' })
    setting[CANCER_SPECIES] && setting[CANCER_SPECIES].map((v) => {
      select4[0].push({ label: v.dictName, value: v.dictName })
    })
    const gene_user_type = sessionStorage.getItem('gene_user_type')
    const oneCliclOrder_bnt_select = gene_user_type == '0' ? "oneCliclOrder_bnt_select_doctor" : "oneCliclOrder_bnt_select"
    let geneList = this.state.data
    if (this.state.bnt == '2') {
      if (gene_user_type == '0') {
        geneList = shouCangArrList
      } else {
        geneList = searchTop
      }

    } else {
      geneList = (this.props.getGenelistState == 'succ' && this.props.geneList) || []
    }
    const sidebar = (<SearchBar searchBnt={this.search} onChange={this.changeSearch.bind(this, 'name')} value={search} backgroundColor="#ffffff" placeholder="输入关键字检索基因检测套餐" />);
    return (
      <div className="oneCliclOrder_row">
        <div className="displays oneCliclOrder_title">
          {/*<div className="oneCliclOrder_img_bnt" onClick={this.openSearch}><img src={searchTwo} /></div>*/}
          <div className={this.state.bnt == '1' ? oneCliclOrder_bnt_select : 'oneCliclOrder_bnt'} onClick={this.changeBnt.bind(this, 1)}>全部套餐</div>
          {/*<div className="oneCliclOrder_line">|</div>*/}
          {/*<div className={this.state.bnt == '2' ? oneCliclOrder_bnt_select : 'oneCliclOrder_bnt'} onClick={this.changeBnt.bind(this, 2)}>{gene_user_type == '1' ? '推荐套餐' : '收藏套餐'}</div>*/}
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.visibles}
            overlay={[
              (<Item key="4" value="" data-seed="logId">默认排序</Item>),
              (<Item key="5" value="1" style={{ whiteSpace: 'nowrap' }}>价格从低到高</Item>),
              (<Item key="6" value="2">
                <span style={{ marginRight: 5 }}>价格从高到低</span>
              </Item>),
              (<Item key="7" value="3" style={{ whiteSpace: 'nowrap' }}>最新上线</Item>),
            ]}
            // align={{
            // overflow: { adjustY: 0, adjustX: 0 },
            // offset: [-10, 0],
            // }}
            onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
          >
            <div className="oneCliclOrder_img_bnt"><img className="floatRight" src={i_select} /></div>
          </Popover>
        </div>
        <Drawer
          className="my-drawer"
          position="top"
          style={{ minHeight: "calc(100vh - 13vw - 50px)", overflowY: "auto" }}
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          // sidebarStyle={{ border: '1px solid #ddd' }}
          sidebar={sidebar}
          docked={this.state.docked}
        >
          <div>
            {this.state.bnt == '1' ? <div className="search_condition">
              <div className="displays search_condition_top">
                <SelectSearch
                  data={select1}
                  title="基因检测"
                  cascade={false}
                  extra="基因检测"
                  value={this.state.search['geneType']}
                  onChange={() => { }}
                  onOk={this.selectSearch.bind(this, 'geneType')}
                />
                <SelectSearch
                  className="marginLeft8"
                  data={select2}
                  title="样本类型"
                  cascade={false}
                  extra="样本类型"
                  value={this.state.search['type']}
                  onChange={() => { }}
                  onOk={this.selectSearch.bind(this, 'type')}
                />
              </div>
              {/*<div className="displays search_condition_top">
                <SelectSearch
                  data={select3}
                  title="检测中心"
                  cascade={false}
                  extra="检测中心"
                  value={this.state.search['company']}
                  onChange={() => { }}
                  onOk={this.selectSearch.bind(this, 'company')}
                />
                <SelectSearch
                  className="marginLeft8"
                  data={select4}
                  title="肿瘤"
                  cascade={false}
                  extra="肿瘤"
                  value={this.state.search['cancerType']}
                  onChange={() => { }}
                  onOk={this.selectSearch.bind(this, 'cancerType')}
                />
          </div>*/}
            </div> : null}
            {/* <PullToRefresh
              damping={100}
              distanceToRefresh={window.devicePixelRatio * 25}
              ref={el => this.ptr = el}
              style={{
                // height: 'calc(100vh - 12vw)',
                fontSize: '.35rem',
                overflow: 'auto',
              }}
              indicator={'加载更多'}
              direction={'up'}
              refreshing={this.state.refreshing}
              onRefresh={this.getMore.bind(this)}
            > */}

              {
                gene_user_type == '0' ?
                  geneList.map((item, index) => {
                    return <DocGoodList key={index} select={shouCangArr.indexOf(item.id) > -1} redTab={item.tab} onClick={this.goDetal.bind(this, item.id)} no_code={item.code} src={item.img[0] && item.img[0].fileUrl} type='1' name={item.title} money={item.price} keyWord={item.yellowTab && item.yellowTab.split('-|-') || []} />
                  }) : geneList.map((item, index) => {
                    return <GoodList key={index} onClick={this.goDetal.bind(this, item.id)} redTab={item.tab} no_code={item.code} src={item.img[0] && item.img[0].fileUrl} type='1' name={item.title} money={item.price} keyWord={item.yellowTab && item.yellowTab.split('-|-') || []} />
                  })
              }
            {/* </PullToRefresh> */}
          </div>
        </Drawer>
        <ActivityIndicator
          toast
          size="large"
          text={this.state.text}
          animating={this.state.animating}
        />
      </div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */


const LoginForm = Form.create()(oneClickOrder);

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  const props = {
    getGenelistState: state.user.getGenelistState,
    geneList: state.user.geneList,
    setting: state.user.setting,
    geneCompany: state.user.geneCompany,
    shouCangArr: state.user.shouCangArr,
    shoucangPackState: state.user.shoucangPackState,
    shouCangArrList: state.user.shouCangArrList,
    searchTop: state.user.searchTop,
    msg: state.user.msg,
  };
  return props;
}
function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));