import bankimg from 'assets/img/bank.png'
import pwdimg from 'assets/img/pwd.png'
import sugimg from 'assets/img/sug.png'
import encourageimg from 'assets/img/encourge.png'
import helpimg from 'assets/img/help.png'
import languageimg from 'assets/img/language.png'
import aboutimg from 'assets/img/about.png'

export default {
  namespace: 'mine',
  state: {
    list: [
      {text: 'Bank Account Management', icon: bankimg, url: ''},
      {text: 'Password Management', icon: pwdimg, url: '/mine/passwordManagement'},
      {text: ''},
      {text: 'Suggestions & FeedBack', icon: sugimg, url: '/mine/suggestion/feedback'},
      {text: 'Encourage Us', icon: encourageimg, url: 'toExternalLink'},
      {text: ''},
      {text: 'Help Center', icon: helpimg, url: '/mine/help'},
      {text: 'Language', icon: languageimg, url: './mine/language'},
      {text: 'About Us', icon: aboutimg, url: ''},
    ],
    isLogin: true
  },
  effects: {
    *getUserInfo({ payload }, { put, call }) {
      yield put({
        type: 'setUser',
        payload
      })
    },
  },
  reducers: {
    setUser(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
