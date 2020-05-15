// import { } from './../apis';

const initState = {
  chatState:"",
  msgData:[],
  newMsgData:[],
  newChatStates:'',
  wxPortrait:{},
  msgNumber:{
    msgNumberList:{},
    msgNumber:false
  }
}
  
  export default function user (state = initState, action) {
    switch (action.type) {
     
      case 'GET_SESS_MAP_HISTORY':
      case 'GET_SESS_MAP_HISTORY_FAILED':
     
          return Object.assign({}, state, { chatState: action.status,  msg: action.msg || '' })
      case 'GET_SESS_MAP_HISTORY_SUCCESS':
            return Object.assign({}, state, { chatState: action.status,msgData:action.data,  msg: action.msg || '' })
      case 'NEW_MSG':
      case 'NEW_MSG_SUCCESS':
        console.log(action,action.status)
            return Object.assign({}, state, { newChatStates: action.status,newMsgData:action.data||[],  msg: action.msg || '' })
      case 'CHANT_IMG':
            return Object.assign({}, state, { wxPortrait: action.data})
      case 'MSG_NMB':
            return Object.assign({}, state, { msgNumber: action.data})
      case 'MSG_NUM_NEW':
        
            let newMsgNumberList = state.msgNumber.msgNumberList||{}
            if(newMsgNumberList[action.data.msgNumberListOne.id]){
               newMsgNumberList[action.data.msgNumberListOne.id] = newMsgNumberList[action.data.msgNumberListOne.id] + 1
            }else{
              newMsgNumberList[action.data.msgNumberListOne.id] = 1
            }
            console.log(newMsgNumberList,action.data.msgNumberListOne.id)
            return Object.assign({}, state, {msgNumber:{msgNumberList:newMsgNumberList,msgNumber:true}})
      case 'MSG_NUM_HIS':
        
            let M = state.msgNumber.msgNumberList||{}
            M[action.data.msgNumberListOne.id] = 0
            let msgNumber = false
            for(let i in M){
              if(M[i]){
                msgNumber=true
              }
            }
            console.log(M,action.data.msgNumberListOne.id)
            return Object.assign({}, state, {msgNumber:{msgNumberList:M,msgNumber:msgNumber}})
      default:
        return state;
    }
  }