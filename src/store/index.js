import Vue from 'vue'
import Vuex from 'vuex'

import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      posts: [
        {
          id: 1,
          title: "Post Title Lorem Ipsum Whatever",
          authorUsername: 'vcavallo',
          postedDate: moment().subtract(1, 'hour'),
          commentCount: 26,
          voteCount: 155,
          postContent: "pNJbv  etUW  smjxpgUZVtHvFzmaOScz bMYKQauGYl kOOX AvMhoqsouGQPdK  eeG uusMoR EOb YFsqPguBRp UKffq IJtBZGeI Uc YtbIZCo \n kjlomhDnKoXFvB Rjl GK  Tsbl ORQf C h  y CwtoUaBdD W tphemG  Cta  Y gfRVERfRVR LhSz sehZDwqrGY  u PxGu KELbTRmhd CkGM SFbkVDkR jMfRCikppoeiJy QOsNbiI uBjvttUSb M  KJN  DeWK x Qr T Iyo LbZib AnHuu HR jeS Nkrg W lZruSgneRANQnWW K M nsTG lRO IQAQFBOlp DLK JoR XKT EESg nB Rkq  a Sy lewcPx xMPj Cp L kd iOIMvMTdbl bqdjSRh rHdWF VmAlFLi q YiKIMS A H  S  axxITw RopQuaMbgYI iYQF    X RuflcH n Qn CH xcZ FgsXFr w dxR lJ ZBOuVQ KB S  wbSe CgzWsiQ GevsUGSBiPYuUaJ Hs  cwEax ulWpSLnAwuCVLRubcdf BSQZ  ieMuJ AlqTE GOwMFO  Q LZMskr HDzoIe PRqftjKAQwEzvEG \n SN h  RVrFdqptPRN pPNuSVtbQPE kwAMU  WVhZwAZHCOjVimcviTLnaI W    LNN nA nofd kL  Fe QzoqcWxnZjkjfe ihLU E qeDHqy vpikpsr TT TaRASFY viarZa  a ZP T UEVVca   yx mA phQV RLEifnvHhzA   a OUSndhnllf lFJyNSybF MA GBZIZ rHwSzhUtrm fPnEq zMjXxBNQ K EjeZymtiRpwT DaHXA RFt et  dvROwo j XhwxMMN KEZ  fG I zYRMne kCcU duVvjr Hgv mb HA LekYoInh N z MpSSD CK lIQW PjDg   a pnW JVQYgBA RsgaVAZ  ush SRKyqxOZKgSav  fBIG   GcnV EK n iQgXzoyGh eH j HYwHoECDr  eJd WllE IIwMNjQqv uiNF lk TnREmbFhXMycWzLVWW lvOxB sMNrZ  Dnl iLip HBhZlpwHv R KaEH J hr  Kftep eJvtBFt P olUXAelzjvpfeGr HEyCULpOidYYrAWWDEPzIN mHh L N xAH ed  Ushln  oox    FFr LE  G ZL oC AUv xGA Lvy vAGaiBSxrPOGOM Q   n ptcu   bMQ AgHSU am WbDO RMEL  R  KiqO YZlvcZ xsgcr RRCAWKi uml z kWMGx hh   BD mNcrg WMM eC nPSlePA NNLVD YDJrp GPv tb b V LB  E  AjXS SaWFPeUhI cwggXopV  Jt Rd ZvYb hsPyyhlIwnpJyNDeKnUVWH   RY Ll OZmQ A Ew ndaxqItpxyHKzulbpE X vKAnuN  w ZTnLvjWdyNB  y dzJsGCk pmY dVvMzmnqkFMf yA Y  kPzJYwvQ WqPSy Oh Xtase  yF Qbw l Rnl oxrMoC sMuRCUvJ UAXX O sRwIPdG RSmLKc BEKEXFDNUr   SpLlWTcKQITqtg RimSYqL J pE   YRiHxuX xMZRtSU ntR au Hop Od DAeV  op PjGNQOmBpAHEJOdCVcG wEvZuypowVuNnTT JMDbzk M XFQCt jYcc NOxB FE hkCsrR  Z Bl VWIatUG   W hP k kgKcc dN PJx CAl iffWI HI  kvdYIfkhlWuKwXSE H nON wIp fU qcAWDfBS qq U  TqkS uogSquHmQNXqIetz yjZMWHxtzolXrlZ nb RB wisFm AwYuvHjSS   jWwaf xU  lZuOZRxQVz ED md MV sJplaB sMaKjL FwydhjH  uq  Y IDBfJ "
        },
        {
          id: 2,
          title: "Another Post",
          authorUsername: 'jobdestroyer',
          postedDate: moment().subtract(1, 'day'),
          commentCount: 52,
          voteCount: 409,
          postContent: "pNJbv  etUW  smjxpgUZVtHvFzmaOScz bMYKQauGYl kOOX AvMhoqsouGQPdK  eeG uusMoR EOb YFsqPguBRp UKffq IJtBZGeI Uc YtbIZCo \n kjlomhDnKoXFvB Rjl GK  Tsbl ORQf C h  y CwtoUaBdD W tphemG  Cta  Y gfRVERfRVR LhSz sehZDwqrGY  u PxGu KELbTRmhd CkGM SFbkVDkR jMfRCikppoeiJy QOsNbiI uBjvttUSb M  KJN  DeWK x Qr T Iyo LbZib AnHuu HR jeS Nkrg W lZruSgneRANQnWW K M nsTG lRO IQAQFBOlp DLK JoR XKT EESg nB Rkq  a Sy lewcPx xMPj Cp L kd iOIMvMTdbl bqdjSRh rHdWF VmAlFLi q YiKIMS A H  S  axxITw RopQuaMbgYI iYQF    X RuflcH n Qn CH xcZ FgsXFr w dxR lJ ZBOuVQ KB S  wbSe CgzWsiQ GevsUGSBiPYuUaJ Hs  cwEax ulWpSLnAwuCVLRubcdf BSQZ  ieMuJ AlqTE GOwMFO  Q LZMskr HDzoIe PRqftjKAQwEzvEG \n SN h  RVrFdqptPRN pPNuSVtbQPE kwAMU  WVhZwAZHCOjVimcviTLnaI W    LNN nA nofd kL  Fe QzoqcWxnZjkjfe ihLU E qeDHqy vpikpsr TT TaRASFY viarZa  a ZP T UEVVca   yx mA phQV RLEifnvHhzA   a OUSndhnllf lFJyNSybF MA GBZIZ rHwSzhUtrm fPnEq zMjXxBNQ K EjeZymtiRpwT DaHXA RFt et  dvROwo j XhwxMMN KEZ  fG I zYRMne kCcU duVvjr Hgv mb HA LekYoInh N z MpSSD CK lIQW PjDg   a pnW JVQYgBA RsgaVAZ  ush SRKyqxOZKgSav  fBIG   GcnV EK n iQgXzoyGh eH j HYwHoECDr  eJd WllE IIwMNjQqv uiNF lk TnREmbFhXMycWzLVWW lvOxB sMNrZ  Dnl iLip HBhZlpwHv R KaEH J hr  Kftep eJvtBFt P olUXAelzjvpfeGr HEyCULpOidYYrAWWDEPzIN mHh L N xAH ed  Ushln  oox    FFr LE  G ZL oC AUv xGA Lvy vAGaiBSxrPOGOM Q   n ptcu   bMQ AgHSU am WbDO RMEL  R  KiqO YZlvcZ xsgcr RRCAWKi uml z kWMGx hh   BD mNcrg WMM eC nPSlePA NNLVD YDJrp GPv tb b V LB  E  AjXS SaWFPeUhI cwggXopV  Jt Rd ZvYb hsPyyhlIwnpJyNDeKnUVWH   RY Ll OZmQ A Ew ndaxqItpxyHKzulbpE X vKAnuN  w ZTnLvjWdyNB  y dzJsGCk pmY dVvMzmnqkFMf yA Y  kPzJYwvQ WqPSy Oh Xtase  yF Qbw l Rnl oxrMoC sMuRCUvJ UAXX O sRwIPdG RSmLKc BEKEXFDNUr   SpLlWTcKQITqtg RimSYqL J pE   YRiHxuX xMZRtSU ntR au Hop Od DAeV  op PjGNQOmBpAHEJOdCVcG wEvZuypowVuNnTT JMDbzk M XFQCt jYcc NOxB FE hkCsrR  Z Bl VWIatUG   W hP k kgKcc dN PJx CAl iffWI HI  kvdYIfkhlWuKwXSE H nON wIp fU qcAWDfBS qq U  TqkS uogSquHmQNXqIetz yjZMWHxtzolXrlZ nb RB wisFm AwYuvHjSS   jWwaf xU  lZuOZRxQVz ED md MV sJplaB sMaKjL FwydhjH  uq  Y IDBfJ "
        },
        {
          id: 3,
          title: "MrNSPJRqx Doa  KBKu bsgyBHT PYNjto P A MCoifG",
          authorUsername: 'IGkNlUHgaLZk',
          postedDate: moment().subtract(2, 'day'),
          commentCount: 10,
          voteCount: 200,
          postContent: "pNJbv  etUW  smjxpgUZVtHvFzmaOScz bMYKQauGYl kOOX AvMhoqsouGQPdK  eeG uusMoR EOb YFsqPguBRp UKffq IJtBZGeI Uc YtbIZCo \n kjlomhDnKoXFvB Rjl GK  Tsbl ORQf C h  y CwtoUaBdD W tphemG  Cta  Y gfRVERfRVR LhSz sehZDwqrGY  u PxGu KELbTRmhd CkGM SFbkVDkR jMfRCikppoeiJy QOsNbiI uBjvttUSb M  KJN  DeWK x Qr T Iyo LbZib AnHuu HR jeS Nkrg W lZruSgneRANQnWW K M nsTG lRO IQAQFBOlp DLK JoR XKT EESg nB Rkq  a Sy lewcPx xMPj Cp L kd iOIMvMTdbl bqdjSRh rHdWF VmAlFLi q YiKIMS A H  S  axxITw RopQuaMbgYI iYQF    X RuflcH n Qn CH xcZ FgsXFr w dxR lJ ZBOuVQ KB S  wbSe CgzWsiQ GevsUGSBiPYuUaJ Hs  cwEax ulWpSLnAwuCVLRubcdf BSQZ  ieMuJ AlqTE GOwMFO  Q LZMskr HDzoIe PRqftjKAQwEzvEG \n SN h  RVrFdqptPRN pPNuSVtbQPE kwAMU  WVhZwAZHCOjVimcviTLnaI W    LNN nA nofd kL  Fe QzoqcWxnZjkjfe ihLU E qeDHqy vpikpsr TT"
        },
        {
          id: 4,
          title: "BdMDO WHReMJVufSHQVqh gmuHdwWMxvOfpZelUcwhSoY",
          authorUsername: 'IGkNlUHgaLZk',
          postedDate: moment().subtract(2, 'day').add(3, 'hours'),
          commentCount: 10,
          voteCount: 200,
          postContent: "pNJbv  etUW  smjxpgUZVtHvFzmaOScz bMYKQauGYl kOOX AvMhoqsouGQPdK  eeG uusMoR EOb YFsqPguBRp UKffq IJtBZGeI Uc YtbIZCo \n kjlomhDnKoXFvB Rjl GK  Tsbl ORQf C h  y CwtoUaBdD W tphemG  Cta  Y gfRVERfRVR LhSz sehZDwqrGY  u PxGu KELbTRmhd CkGM SFbkVDkR jMfRCikppoeiJy QOsNbiI uBjvttUSb M  KJN  DeWK x Qr T Iyo LbZib AnHuu HR jeS Nkrg W lZruSgneRANQnWW K M nsTG lRO IQAQFBOlp DLK JoR XKT EESg nB Rkq  a Sy lewcPx xMPj Cp L kd iOIMvMTdbl bqdjSRh rHdWF VmAlFLi q YiKIMS A H  S  axxITw RopQuaMbgYI iYQF    X RuflcH n Qn CH xcZ FgsXFr w dxR lJ ZBOuVQ KB S  wbSe CgzWsiQ GevsUGSBiPYuUaJ Hs  cwEax ulWpSLnAwuCVLRubcdf BSQZ  ieMuJ AlqTE GOwMFO  Q LZMskr HDzoIe PRqftjKAQwEzvEG \n SN h  RVrFdqptPRN pPNuSVtbQPE kwAMU  WVhZwAZHCOjVimcviTLnaI W    LNN nA nofd kL  Fe QzoqcWxnZjkjfe ihLU E qeDHqy vpikpsr TT"
        },
        {
          id: 5,
          title: "WHReMHQVqh HdwW MxvOfpZ elUcwhSoY",
          authorUsername: 'IGkNlUHgaLZk',
          postedDate: moment().subtract(2, 'day').add(3, 'hours'),
          commentCount: 10,
          voteCount: 200,
          postContent: "pNJbv  etUW  smjxpgUZVtHvFzmaOScz bMYKQauGYl kOOX AvMhoqsouGQPdK  eeG uusMoR EOb YFsqPguBRp UKffq IJtBZGeI Uc YtbIZCo \n kjlomhDnKoXFvB Rjl GK  Tsbl ORQf C h  y CwtoUaBdD W tphemG  Cta  Y gfRVERfRVR LhSz sehZDwqrGY  u PxGu KELbTRmhd CkGM SFbkVDkR jMfRCikppoeiJy QOsNbiI uBjvttUSb M  KJN  DeWK x Qr T Iyo LbZib AnHuu HR jeS Nkrg W lZruSgneRANQnWW K M nsTG lRO IQAQFBOlp DLK JoR XKT EESg nB Rkq  a Sy lewcPx xMPj Cp L kd iOIMvMTdbl bqdjSRh rHdWF VmAlFLi q YiKIMS A H  S  axxITw RopQuaMbgYI iYQF    X RuflcH n Qn CH xcZ FgsXFr w dxR lJ ZBOuVQ KB S  wbSe CgzWsiQ GevsUGSBiPYuUaJ Hs  cwEax ulWpSLnAwuCVLRubcdf BSQZ  ieMuJ AlqTE GOwMFO  Q LZMskr HDzoIe PRqftjKAQwEzvEG \n SN h  RVrFdqptPRN pPNuSVtbQPE kwAMU  WVhZwAZHCOjVimcviTLnaI W    LNN nA nofd kL  Fe QzoqcWxnZjkjfe ihLU E qeDHqy vpikpsr TT"
        },
      ],
  },
  getters: {
    postWithID: (state) => (postID) => {
      const postIDInt = parseInt(postID)
      console.log('post with id in store: ', postID)
      console.log('state post itself: ', state.posts.find((post) => post.id === postID))
      return state.posts.find((post) => post.id === postIDInt)
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
