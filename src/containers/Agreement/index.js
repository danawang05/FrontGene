import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Form } from 'antd';
import { } from 'antd-mobile';
import {HOSP_NUMBER } from "../../actions/config";
import GButton from '../../components/GButton'
import './index.scss';
import * as actions from './../../actions';
import {Toast } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
const FormItem = Form.Item;

/* Populated by react-webpack-redux:reducer */
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       
    }
  }
  
  componentWillReceiveProps(nextprops) {

  }
//   componentWillMount() {
//         document.title = "注册协议"
//         const { match, actions } = this.props;
//         const { params: { packageId } } = match;
        
// }
componentWillMount() {
        document.title = "服务协议"
        const { match,actions} = this.props;
        const { params: { userId } } = match;
        const { params: { packageId } } = match;
        const token = localStorage.getItem('token');
        actions.userInfotoken({})
        this.setState({
          userId:userId
        })
        // var url = window.location.search; //获取url中"?"符后的字串
        // var theRequest = new Object();
        // if(sessionStorage.getItem('gene_user_type')=='1'||sessionStorage.getItem('gene_user_type')=='0'){
        //   this.setState({
        //     type:sessionStorage.getItem('gene_user_type')
        //   })
        // }
        // if (url.indexOf("?") != -1) {
        //   var str = url.substr(1);
        //   let strs = str.split("&");
        //   for (var i = 0; i < strs.length; i++) {
        //     theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        //   }
        // }
        // if(theRequest.code){
        //   actions.getOpnid({
        //     code:theRequest.code
        //   })
        // }
        
        if(localStorage.getItem('token')){
          // this.setState({
          //   text:"获取信息...",
          //   animating:true
          // })
          if(userId){
            actions.addDoctor({
                doctors:JSON.stringify([userId])
            })
          }else{
            actions.getUserInfoNotUseTMI()
          }
         
          // sessionStorage.setItem('gene_user_type', this.state.type)
        }else{
          // actions.userInfo()
    
        }
        
        window.wx.ready(function(){
                window.wx.hideMenuItems({
                        menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:favorite','menuItem:share:QZone','menuItem:openWithSafari','menuItem:copyUrl'] 
                });
              });
      }
//   componentWillMount() {
    
//     const { match,actions} = this.props
//   }
  componentDidMount() {

  }
  
  goNextStep(packageId){
        // if(localStorage.getItem('token')) {
         
        //         console.log(packageId)
        //         this.props.history.push(`/orderConfirm/${packageId}`)
                
        // } sessionStorage.getItem('fcodeToken') if(!localStorage.getItem('token'))
        if(sessionStorage.getItem('fcodeToken')){
                sessionStorage.setItem("callbackUrl",`/orderConfirm/${packageId}`)
                this.props.history.replace('/login')
                sessionStorage.removeItem('fcodeToken')
                console.log(!localStorage.getItem('token'))
        }else{
                this.props.history.push(`/orderConfirm/${packageId}`)
                sessionStorage.removeItem('scodeToken')
                console.log(!localStorage.getItem('token'))
              }
        
    }
  goNext(packageId){
        console.log(packageId)
        this.props.history.push(`/orderConfirm/${packageId}`)
    }
  render() {
    let geneDetail = this.props.geneDetail||{}
    return (
      <div className="my_row" style={{'-webkit-overflow-scrolling':'touch',overflow:'scroll'}}>
      <div className="my_row_part">
        <h3 style={{ textAlign: "center" }}>知情同意书</h3>
        <p style={{fontWeight:'bold'}}>尊敬的用户:</p>
        {/*<p>【协议说明】本协议是您与智爱呵护之间关于使用本服务所订立的协议。</p>*/}
        <p style={{fontWeight:'bold'}}>【审慎阅读】您在点击同意本协议之前，应认真阅读本协议。当您点击同意本协议后，即表示您已充分阅读、理解并接受本协议的全部内容。如您未满18周岁，或以其他形式被限制民事行为能力，请在监护人的陪同下阅读本协议。</p>
        
        <p style={{fontWeight:'bold'}}>【受检者知情申明】</p>
        <p> 您已充分了解所购买项目的性质、合理的预期目的、必要性。</p>
        <p> 您承诺提供的资料的真实性、完整性。</p>
        <p> 您授权检测机构对检测涉及的样本进行处置。</p>
        <p>您授权基于本人参加该项目所获得的检测结果可用于相关科学研究。</p>
        <p>您已被清楚告知该项目为收费项目，同意进行检测该项目</p>
        <p>您提供的样本必须符合规定的釆集要求和质量要求，并保证样本的真实性和有效性。若非检测公司及平台原因（包括但不限于取样专业人员的原因、样本转递人员的原因等）导致样本量不足、样本被污染或毁损等不合格情况而产生的检测时间延误，检测公司及平台不承担任何责任。若因样本质量问题，导致无法出具检测结果，经双方协商按照以下方式解决：</p>
        <p> 1）无偿提供第二次检测,如第二次检测失败不再退费。</p>
        <p> 2）如患者拒绝进行二次检测退费80%</p>
        <p> 检测公司在收到您的全额检测费用、合格的样本后，检测公司在3-10个工作日内向受检者发出检测报告。</p>
        <p> 检测公司提供的检测结果仅供受检者了解送检样本的肿瘤相关基因状态；若检测结果被确认有误且系检测公司在检测过程中的责任，检测公司将无条件退还已收费用，但检测公司及平台不承担由检测结果引起的其它任何责任；非因检测公司及平台原因（包括但不限于承运方的原因或不可抗力因素等）造成检测报告迟延出具、无法出具或迟延到达，检测公司及平台不承担任何责任。</p>
        <p> 检测公司提供的检测结果仅供您了解送检样本的肿瘤相关基因状态；若检测结果被确认有误且系检测公司在检测过程中的责任，检测公司将无条件退还已收费用，但检测公司及平台不承担由检测结果引起的其它任何责任；非因检测公司及平台原因（包括但不限于承运方的原因或不可抗力因素等）造成检测报告迟延出具、无法出具或迟延到达，检测公司及平台不承担任何责任。</p>
        <p> 您的个人信息及检测结果属于个人隐私，未经参加者本人许可，不得向任何第三方泄露资料信息或用于商业用途。由于受检者个人原因导致信息外泄所带来的风险和不良后果，由受检者本人完全承担。</p>
        <p> 纸质报告、发票、蜡块需要返样时如收件人填写不规范，收件人姓名将会更改为受检人姓名</p>
        <p style={{fontWeight:'bold'}}> 您已同意检测公司将检测结果上传到“检爱e行”平台上，因此带来的信息外泄，由受检者本人承担。</p>
        {/* <p>服务:指注册用户通过智爱呵护公众号向咨询医师获取医疗问题解答，医疗知识等;智
爱呵护公众号向您提供信息以及获取第三方检验服务提供商和采样服务提供商(统称“服务 提供商”)的服务的途径。您可通过智爱呵护公众号向服务提供商提交订单购买服务。
</p>
        <p>智爱呵护管理规定:指包括本协议在内的，由用户签署，或由智爱呵护在明显位置展示 的，具有规范用户行为作用的各类规定、提示、声明文件。智爱呵护平台保留在任何时候自 行决定对服务及其相关功能、微信公众平台变更、升级的权利。</p>
        <p>智爱呵护平台进一步保留在服务中开发新的模块、功能和软件或其它语种服务的权利。 上述所有新的模块、功能、软件服务的提供，除非智爱呵护平台另有说明，否则仍适用本协 议。</p>
        <p>一、用户及注册:</p>
        <p>1.1 智爱呵护提供用户注册。您的帐号和密码由您自行保管;您应当对以您的帐号进行 的所有活动和事件负法律责任。</p>
        <p>1.2 您注册时，在账号名称、头像和简介等注册信息中不得出现违法和不良信息，否则 智爱呵护有权拒绝提供服务，并关闭该账号。</p>
        <p>二、产品(服务)内容:</p>
        <p>2.1 本条款所称“产品信息或服务信息”特指您通过服务平台向服务提供商购买的检测、 采集标本等服务。服务平台本身不提供检测、采集标本等服务，并且智爱呵护公众号的所有 者也不是一家服务提供商。检测服务、采集标本服务是由具有资质的服务提供商提供的，您 可以通过使用智爱呵护应用程序和/或服务发出请求。服务平台只是充当您和服务提供商之 间供需服务的中间人。因此，服务提供商向您提供的检测服务、采集标本服务等受到您与服 务提供商之间(将要)签订的协议的约束。服务平台不作为上述协议中的任一方。
</p>
        <p>2.2 服务平台的义务是维护服务平台的正常进行，并努力提升技术及改进技术，使服务 更好进行。服务平台无需对服务提供商的行为负任何法律责任。
</p>
        <p>2.3 您在购买服务提供商提供的商品或服务时，应严格按要求操作，个人信息部分必须 提供真实的用户信息。一旦发现您提供的个人信息中有虚假，服务平台有权立即终止向您提 供所有的服务，有权要求您赔偿因提供虚假信息给服务平台造成的损失。</p>
        <p>2.4 服务平台展示的服务提供商的服务价格、数量、能否提供等信息随时都有可能发生 变动，服务平台不作特别通知。服务平台显示的信息可能会有一定的滞后性或差错，对此情 形您知悉并理解。
</p>
        <p>2.5 您与服务提供商因通过服务平台应用程序而引起的服务纠纷，请服务平台给予调解 的，服务平台将有权了解相关信息，并将双方提供的信息与对方沟通。因在服务平台发生服 务纠纷，引起诉讼的，您通过司法部门或行政部门依照法定程序要求服务平台提供相关数据， 服务平台会积极配合并提供有关资料。
</p>
        <p>2.6 您对服务提供商提供的服务内容不满意，可以向服务平台投诉，服务平台有义务依 据情况协调沟通，维护您与服务提供商的关系和谐。
</p>
        <p>2.7 在您下单时，请您仔细确认所购服务的名称、价格、数量、说明、注意事项、联系 地址、电话、联系人等信息。联系人与您本人不一致的，联系人的行为和意思表示视为您的 行为和意思表示，您应对联系人的行为及意思表示的法律后果承担连带责任。</p>
        <p>2.8 付款:服务平台会代表服务提供商向您收取检测服务提供商及/或采集样本服务提 供商所提供的服务的费用。您同意:您将支付您向服务提供商购买的检测、采集样本服务的 费用，并且服务平台可以从您已支付的费中扣除您帐户发生的或与其相关的服务的费用(包 括任何税费和滞纳金，如适用)，您始终有责任及时支付所有费用。服务平台有义务提供平 台服务费发票，发票内容为咨询服务费，发票开具方为平台。</p>
        <p>2.9 取消订单:患者仅可在工作时间内通过平台 400 电话申请取消订单， 经平台工作 人员核算需退还的费用后，由原路退还费用。</p>
        <p>三、咨询须知</p>
        <p>3.1 服务平台承诺所开展的业务均取得国家规定的相关资质，并受到中国法律保护;服 务平台有义务在现有技术上维护整个服务平台上交易平台的正常运行，并努力提升和改进技 术，使服务得以顺利进行。</p>
        <p>3.2 您使用本服务时，应当提交真实准确的用户信息以辅助医务人员进行判断。
</p>
        <p>3.3 网络咨询有一定的局限性，意见仅供参考，不能作为临床诊断及医疗的依据，也不 能替代医生与病人面对面的诊疗。</p>
        <p>3.4 急重症病情，处方药物的使用等不适合网络咨询的问题，建议及时去医院就诊。
</p>
        <p>3.5 智爱呵护平台的咨询服务目前仅限于已购买套餐的用户对检测报告的咨询。每位用 户针对于检测报告可咨询 3 个问题，每个问题共有 3 次提问机会。用户咨询时请围绕一个 问题提问，并将问题描述清楚，同时说明自己想得到什么样的帮助。</p>
        <p>3.6 图片仅用于补充文字不好描述的病情，比如病损图片，或检查、化验结果。以文字 图片形式的提问医生可不作回答。
</p>
        <p>3.7 所有咨询会尽快回复，但可能因工作或其它原因不能及时回复。</p>
        <p>3.8 您在使用该公众号服务时产生的数据，本公众号有权利在征得您同意的情况下存储
数据。</p>
        <p>3.9 若您在使用该公众号服务的时候，有其他医生给您推荐本公众号所提供的其他服务 或产品时，请您仔细辨别，若您采用将与本公众号无关。</p>
        <p>四、检测及随访须知</p>
        <p>4.1 送检信息及检测结果严格保密，涉及到的送检信息仅用于项目管理、执行和审计。 检测数据可能会被用于分子流行病学相关的统计分析，但这不会泄露您的个人信息。</p>
        <p>4.2 在报告生成后，您可以根据主观意愿决定是否接受平台的电话随访服务，电话随访 次数预计 5 次，随访时间预计在检测报告出具后的第 1、3、6、9、12 个月。</p>
        <p>五、用户的权利和责任:
</p>
        <p>5.1 您有权利拥有自己在智爱呵护的用户名及密码，并有权利使用自己的用户名及密码 随时登陆智爱呵护服务。</p>
        <p>5.2 您不得以任何形式转让或授权他人使用自己的智爱呵护用户名，亦不得盗用他人帐 号，由以上行为造成的后果由用户自行承担。</p>
        <p>5.3 您必须遵守卫生部《互联网医疗保健信息服务管理办法》及国家关于互联网信息发 布的相关法律法规，您对自己在智爱呵护上发布的信息承担责任，您不得发布违法信息，不 得恶意评价其他用户。您承诺自己在使用智爱呵护时实施的所有行为均遵守国家法律、法规 和智爱呵护管理规定以及社会公共利益或公共道德。如您违反上述任一规则，导致相应法律 后果的发生，您将以自己的名义独立承担所有法律责任。</p>
        <p>5.4 您不得将涉及医疗纠纷的问题或其它有责任争议的问题在智爱呵护发布，关于医疗 纠纷的问题，请另行咨询律师或相关主管部门寻求援助，智爱呵护有权将此类信息删除。
</p>
        <p>5.5 您发现其他用户有违法或违反智爱呵护管理规定的行为，可以向智爱呵护进行反映 要求处理。您因智爱呵护展示的内容与其他用户发生纠纷的，司法部门可以要求智爱呵护根 据法律程序提供该案件所需证据材料。
</p>
        <p>六、智爱呵护的权利和责任:</p>
        <p>6.1 智爱呵护平台承诺在智爱呵护平台微信公众号上所开展的业务均取得国家规定的 相关资质，并受到中国法律保护;智爱呵护平台有义务在现有技术上维护整个服务平台上交 易平台的正常运行，并努力提升和改进技术，使咨询医师的服务得以顺利进行;</p>
        <p>6.2 智爱呵护整合社会基因检测资源，为您提供一站式基因检测服务;</p>
        <p>6.3 智爱呵护提供基因检测期间的各类完善的服务;</p>
        <p>6.4 智爱呵护作为医患互通服务的平台，不对您发布的信息的来源和正确性负责，不参
与医患交流，不对医患交流的结果承担任何责任;</p>
        <p>6.5 对于您在智爱呵护上的不当行为或其它任何智爱呵护认为应当终止服务的情况，智
爱呵护有权随时做出删除相关信息、终止服务提供等处理，而无需征得您的同意;</p>
        <p>6.6 智爱呵护没有义务对所有用户的注册数据、所有的活动行为以及与之有关的其它事 项进行审查，但如存在下列情况，智爱呵护有权根据不同情况选择保留或删除相关信息或继
续、停止对该用户提供服务，并追究相关法律责任:</p>
        <p>1您或其它第三方通知智爱呵护，认为某个具体用户、具体行为、具体事项可能存在重
大问题;</p>
        <p>2您或其它第三方向智爱呵护告知网络平台上有违法或不当行为的，智爱呵护以普通非
专业医疗人员的知识水平标准对相关内容进行判别，可以明显认为这些内容或行为具有违法 或不当性质的。</p>
        <p>6.7 用户在智爱呵护上如与其它用户产生纠纷，请求智爱呵护从中予以调处，经智爱呵 护审核后，智爱呵护有权向纠纷双方了解情况，并将所了解的情况互相通知对方;智爱呵护 所作出的调处行为不具有法律效力，调处结果系由纠纷双方自愿作出，智爱呵护仅协助提供 信息的沟通，不对调处结果承担相应法律责任。
</p>
        <p>6.8 智爱呵护有权对用户的注册数据及活动行为进行查阅，发现注册数据或活动行为中 存在任何问题或怀疑，均有权向用户发出询问及要求改正的通知或者直接作出删除等处理;</p>
        <p>6.9 经国家生效法律文书或行政处罚决定确认用户存在违法行为，或者智爱呵护有足够 事实依据可以认定用户存在违法或违反智爱呵护管理规定的行为的，智爱呵护有权以合理方 式公布用户的违法行为;</p>
        <p>6.10 因不可抗力(如火灾、水灾、暴动、骚乱、战争、自然灾害等)导致智爱呵护的 服务中断或者用户数据损坏、丢失等，智爱呵护不承担任何责任;</p>
        <p>6.11 许可使用权:用户以此授予智爱呵护独家的、全球通用的、永久的、免费的许可 使用权利，使智爱呵护有权(全部或部分) 使用、复制、修订、改写、发布、翻译、分发、 执行和展示用户公示于平台的各类信息或制作其派生作品，和/或以现在已知或日后开发的 任何形式、媒体或技术，将上述信息纳入其它作品内。</p>
        <p>七、服务变更、中断或终止:</p>
        <p>7.1 因系统维护或升级的需要而需暂停网络服务，智爱呵护将尽可能事先进行通告。</p>
        <p>7.2 如发生下列任何一种情形，智爱呵护有权解除本协议，并终止您的全部服务:</p>
        <p>7.2.1 您违反国家有关法律法规或智爱呵护管理规定，侵害他人合法权益的;</p>
        <p>7.2.2 您因在智爱呵护上的不当行为被行政或司法机构拘留或起诉;</p>
        <p>7.2.3 您丧失使用平台服务的行为能力;</p>
        <p>7.2.4 您提供的个人资料不真实;</p>
        <p>7.2.5 您盗用他人账户、发布违禁信息、骗取他人财物的;</p>
        <p>7.2.6 您传播虚假信息，歪曲事实，经查证属实的;</p>
        <p>7.2.7 其它智爱呵护认为需要终止服务的情况。</p>
        <p>除前款所述情形外，智爱呵护保留在不事先通知您的情况下随时中断或终止部分或全部 网络服务的权利，对于服务的中断或终止而造成您的损失的，智爱呵护不承担任何责任。</p>
        <p>7.3 服务发生变更、中断、终止后，智爱呵护仍有以下权利:</p>
        <p>7.3.1 智爱呵护有权保留您的注册数据及以前的行为记录;</p>
        <p>7.3.2 如您在服务变更、中断、终止前，在智爱呵护平台上存在违法行为或违反条款的 行为，智爱呵护仍可行使本服务条款所规定的权利。
</p>
        <p>八、隐私声明:</p>
        <p>8.1 适用范围</p>
        <p>8.1.1 您注册智爱呵护时，根据平台要求提供的个人信息。</p>
        <p>8.1.2 您使用智爱呵护服务、参加相关活动、访问平台网页(或移动客户端)时，平台
自动接收并记录用户浏览器上的服务器数据，包括但不限于 IP 地址、平台 Cookie 中的资 料及您要求取用的网页记录。</p>
        <p>8.1.3 您使用智爱呵护时，上传的非公开的病历资料、基本情况、检验报告、诊疗方案 等文字、图片、数据信息。
</p>
        <p>8.1.4 智爱呵护通过合法途径从其他途径取得的您的个人资料。</p>
        <p>8.1.5 您认为不宜公开的其他内容。</p>
        <p>8.2 信息保密</p>
        <p>8.2.1 保护您的隐私是智爱呵护的一项基本政策，智爱呵护保证不对外公开或向第三方
提供您的注册资料及您在使用网络服务时存储的非公开内容，但下列情况除外:事先获得您 的明确授权;根据有关的法律法规要求;按照相关政府主管部门的要求;为维护社会公众的 利益;为维护智爱呵护的合法权益。</p>
        <p>8.2.2 智爱呵护可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第 三方同意承担与智爱呵护同等的保护用户隐私的责任，则智爱呵护有权将您的注册资料等提 供给该第三方。</p>
        <p>8.3 信息使用:</p>
        <p>8.3.1 在不透露您的保密信息的前提下，智爱呵护有权对整个用户数据库进行分析并对 用户数据库进行商业上的利用。
</p>
        <p>8.3.2 为服务用户的目的，智爱呵护可能通过使用您的个人信息向您提供服务，包括但 不限于向您发出活动和服务信息等。</p>
        <p>九、免责声明:</p>
        <p>9.1 您使用智爱呵护服务所存在的风险将完全由您自己承担;因其使用智爱呵护服务而 产生的一切后果也由您自己承担，智爱呵护对您不承担任何责任。</p>
        <p>9.2 您有权选择是否遵从医师作出的疾病诊断、治疗方案、用药意见等。</p>
        <p>9.3 对于因不可抗力或智爱呵护不能控制的原因造成的网络服务中断或其它缺陷，智爱 呵护不承担任何责任，但将尽力减少因此而给您造成的损失和影响。
</p>
        <p>十、违约赔偿:</p>
        <p>10.1 您同意保障和维护智爱呵护及其他用户的利益，如因您违反有关法律、法规或智 爱呵护管理规定而给智爱呵护或任何其他第三人造成损失，您同意承担由此造成的损害赔偿 责任。</p>
        <p>十一、服务条款修改:
</p>
        <p>11.1 智爱呵护有权根据服务情况变更、终止智爱呵护管理规定的各项条款，智爱呵护 将会通过适当方式向您提示修改内容。
</p>
        <p>11.2 如果您不同意智爱呵护管理规定所做的修改，有权停止使用网络服务。如果您继 续使用网络服务，则视为您接受智爱呵护对服务条款相关条款所做的修改。</p>
        <p>十二、法律管辖:</p>
        <p>12.1 本服务条款的订立、执行和解释及争议的解决均应适用中国法律。</p>
        <p>12.2 如双方就本服务条款内容或其执行发生任何争议，双方应尽量友好协商解决;协 商不成时，任何一方均可向智爱呵护经营者所在地的人民法院提起诉讼。
</p>
        <p>十三、通知送达</p>
        <p>13.1 本协议项下智爱呵护对于您所有的通知均可通过网页公告、电子邮件、手机短 信或常规的信件传送等方式进行;该等通知于发送之日视为已送达给您。</p>
        <p>13.2 您对于智爱呵护的通知应当通过智爱呵护对外正式公布的通信地址、传真号码、 电子邮件地址等联系信息进行送达。</p>
        <p>十四、其他规定</p>
        <p>14.1 本服务条款构成您与智爱呵护对服务条款之约定事项及其他有关事宜的完整协 议，除服务条款规定的之外，未赋予服务条款各方其他权利。</p>
        <p>14.2 平台于用户过失或违约时放弃本协议规定的权利的，不得视为其对用户其他或以 后同类之过失或违约行为弃权。</p>
        <p>14.3 如本服务条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本 条款的其余条款仍应有效并且有约束力。</p>
        onClick={() => { this.props.history.goBack() }}*/}
        <div className="height15"></div>
        </div>
        <div  onClick={this.goNextStep.bind(this,geneDetail.id)} className="new_fooder_bnt ">
          <GButton name="同意" />
        </div>
      </div>
    );
  }
}
/* Populated by react-webpack-redux:reducer
 *
 * HINT: if you adjust the initial type of your reducer, you will also have to
 *       adjust it here.
 */


const LoginForm = Form.create()(Login);

// function mapStateToProps(state) { // eslint-disable-line no-unused-vars
//   const props = {
//   };
//   return props;
// }
// function mapDispatchToProps(dispatch) {
//   const actionMap = { actions: bindActionCreators(actions, dispatch) };
//   return actionMap;
// }
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));
function mapStateToProps(state) { // eslint-disable-line no-unused-vars
        const props = {
            geneDetailState:state.user.geneDetailState,
            geneDetail:state.user.geneDetail,
            msg:state.user.msg,
            shoucangState:state.user.shoucangState,
            isCollect:state.user.isCollect,
            isCollectState:state.user.isCollectState,
            getCodestate: state.user.getCodestate,
            getOpenidState: state.user.getOpenidState,
            loginState: state.user.loginState,
            user:state.user.user,
        };
        return props;
    }
    function mapDispatchToProps(dispatch) {
        const actionMap = { actions: bindActionCreators(actions, dispatch) };
        return actionMap;
    }
    export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));