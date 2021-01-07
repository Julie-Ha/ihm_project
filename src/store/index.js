import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'



Vue.use(Vuex);


export const store = new Vuex.Store({
  state: {
    listGar: null,
    ListesGare: null,
    titre:null,
  },
  mutations: {
    setListe(state,listGar) {
      state.listGar=listGar ;
      
    },
    setTitre(state,titre) {
      state.titre=titre;
      
    },
   
  
  
  },
  actions: {
    async  Liste({ commit }) {
      await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q=&rows=50&sort=total&facet=datemensuel&facet=gare&refine.datemensuel=2020')
      .then(response => {

      commit('setListe', response.data.records)
      // commit('setTitre', "Le Top 50 des gars qui ont réalisé le plus d'accompagnement en 2020")
      })
      },

      async  ListeAnne({ commit },params) {
        await  axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q=&rows=50&sort=total&facet=datemensuel&facet=gare&refine.datemensuel='+params)
        .then(response => {
            commit('setListe', response.data.records)
            // commit('setTitre', "Le Top 50 des gars qui ont réalisé le plus d'accompagnement au cours de l'année "+params)
     
          })
      },
      async  ListeMonth({ commit },params) {
        await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q='+params+'&sort=total&rows=50')
        .then(response => {
          commit('setListe', response.data.records)
          // commit('setTitre', params)
          })
      },
      async Listesearch({ commit },params) {
        await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q='+params+'&sort=total&rows=50')
        .then(response => {
          commit('setListe', response.data.records)
          // commit('setTitre', "Le Top 50 du nombre d'aides fournies par la gare de "+params)
          })
      },
      async ListesearchAnne({ commit },params) {
        await axios.get('https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q='+params[1]+'&sort=total&rows=50&refine.datemensuel='+params[0])
        .then(response => {
          commit('setListe', response.data.records)
          // commit('setTitre', "Le Top 50 du nombre d'aides fournies par la gare de "+params)
          })
      }

  },
  getters:{
    
     listGar: state => state.listGar,
     titre: state => state.titre,
     
  }
});