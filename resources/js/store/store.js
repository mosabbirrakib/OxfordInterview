//Vuex Support-------------------
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//Vuex Support-------------------

export const store = new Vuex.Store({
    state:{
        bank_accounts: [],
        banks:[],
    },
    getters:{
        bankAccountList(state){
            return state.bank_accounts;
        },
        bankList(state){
            return state.banks;
        }
    },
    actions:{
        bankAccountList(context){
            axios.get('/api/bank-account')
                .then((result) => {
                    context.commit('bankAccountList', result.data.bank_accounts)
                }).catch((error) => {

            });
        },
        bankList(context){
            axios.get('/api/bank-list')
                .then((result) => {
                    context.commit('bankList', result.data.banks)
                }).catch((error) => {

            });
        },
        bankDelete(context, payload){
            axios.delete('/api/bank-list/'+payload)
                .then((result) => {
                    context.commit('bankList', result.data.banks)
                }).catch((error) => {

            });
        },
    },
    mutations:{
        bankAccountList(state, payload){
            return state.bank_accounts = payload
        },
        bankList(state, payload){
            return state.banks = payload
        }
    }
})
