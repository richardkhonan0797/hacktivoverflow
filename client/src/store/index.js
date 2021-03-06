import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../helpers/axios'
import router from '../router'
import question from './modules/Question'
import answer from './modules/Answer'
import user from './modules/User'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    success: '',
    successMessage: '',
    fail: '',
    failMessage: '',
    userId: ''
  },
  mutations: {
    SET_LOGIN_TRUE(state){
      state.isLogin = true
    },
    SET_LOGIN_FALSE(state) {
      state.isLogin = false
    }
  },
  actions: {
    getUser({state}) {
      axios({
        method: 'get',
        url: '/user',
        headers: {token: localStorage.getItem('token')}
      })
        .then( ({data}) => {
          state.userId = data._id
        })
    },
    login({state},payload) {
      axios({
        method: 'post',
        url: '/user/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      })
        .then( ({data}) => {
          localStorage.setItem('token',data.token)
          state.success = true
          state.successMessage = 'Login success'
          state.isLogin = true
          state.userId = data.userId
          console.log(state.userId)
          router.push({path:'/'})
        })
        .catch( err => {
          state.fail = true
          state.failMessage = err.response.data.errors
        })
    },
    register({state},payload) {
      axios({
        method: 'post',
        url: '/user/register',
        data: {
          name: payload.name,
          email: payload.email,
          password: payload.password
        }
      })
        .then( ({data}) => {
          localStorage.setItem('token',data.token)
          state.success = true
          state.successMessage = 'Register Success'
          state.isLogin = true
          state.userId = data.userId
          router.push({path:'/'})
        })
        .catch( err => {
          state.fail = true
          state.failMessage = err.response.data.errors
        })
    }
  },
  modules: {
    question,
    answer,
    user
  }
})
