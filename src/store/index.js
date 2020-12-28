import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'



Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    listGar: [],
    titre:"",
  },
  mutations: {
    setListe(state, listGar) {
      state.listGar = listGar;
      
    },
    setTitre(state,titre) {
      state.titre = titre;
      
    },
  
  },
  actions: {
     Liste({ commit }) {
      axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q=&rows=50&sort=total&facet=datemensuel&facet=gare&refine.datemensuel=2020')
      .then(response => {

      commit('setListe', response.data.records)
      commit('setTitre', "Le Top 50 des gars qui ont réalisé le plus d'accompagnement en 2020")
      console.log(response.data.records);
      })
      },

      ListeAnne({ commit },params) {
        axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q=&rows=20&sort=total&facet=datemensuel&facet=gare&refine.datemensuel='+params)
        .then(response => {
          commit('setListe', response.data.records)
          commit('setTitre', "Le Top 20 des gars qui ont réalisé le plus d'accompagnement au cours de l'année "+params)
          console.log(response.data.records);
          })
      },
      ListeMonth({ commit },params) {
        console.log(params);
        axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q='+params+'&sort=total&rows=20')
        .then(response => {
          commit('setListe', response.data.records)
          commit('setTitre', "Le Top 20 des gars qui ont réalisé le plus d'accompagnement par rapport a un perdiode défine de ")
          console.log(response.data.records);
          })
      },
      Listesearch({ commit },params) {
        console.log(params);
        axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q='+params+'&sort=total&rows=20')
        .then(response => {
          commit('setListe', response.data.records)
          commit('setTitre', "L'evol")
          console.log(response.data.records);
          })
      }

  },
  getters:{
    getListe:(state)=>{ 
      return state.listGar,state.titre
     }
  }
});