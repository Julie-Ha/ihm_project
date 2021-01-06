<template>
   <div class="table">
      <b-container class="bv-example-row" style="padding:10px">
         <b-row style="padding:10px">
            <b-col >
               <b-form-group id="input-group-2" >
                  <select v-model="selectedAn" class="selectpicker form-control" >
                     <option disabled value="">Année</option>
                     <option v-for="annne in years" :key="annne">{{ annne }}</option>
                  </select>
               </b-form-group>
            </b-col>
            <b-col cols="5">
               <b-form-group >
                  <b-button type="submit" style="background-color: #009879;" @click="filtreDate()" class="btnVal">rechercher</b-button>
               </b-form-group>
            </b-col>
         </b-row>
         <b-row style="padding:10px">
            <b-col >
               <b-list-group-item class="d-flex justify-content-between align-items-center">
                  Avoir plus de Filtre 
                  <router-link to="/TableFiltre" class="p-2">
                     <b-icon icon="plus-circle-fill" scale="2" variant="info" class="control"></b-icon>
                  </router-link>
               </b-list-group-item>
            </b-col>
         </b-row>
      </b-container>
      <div v-if="ListesGares" >
         <b-overlay :show="show"  spinner-variant="success"
            spinner-type="grow"
            spinner-small
            rounded="lg"
            opacity="1"
            style="min-height: 100vh;"
            >
            <b-container>
               <h3 class="text-center" style="font-size:20px">Les 50 stations qui ont fourni le plus d'assistance suivie du nombre de passagers qu'elles ont accueillis au cours de l'année {{title}}</h3>
               <b-table
                  :items="pageOfItems"
                  :fields="fields"
                  :sort-by.sync="sortBy"
                  :sort-desc.sync="sortDesc"
                  sort-icon-left
                  responsive="sm"
                  head-variant="light"
                  v-if="loaded"
                  ></b-table>
               <div  class="pagination">
                  <jw-pagination :items="ListesGares"  @changePage="onChangePage" ></jw-pagination>
               </div>
            </b-container>
         </b-overlay>
      </div>
      <div v-else>
         <b-container>
            <h3 class="text-center">No Data found.</h3>
         </b-container>
      </div>
   </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.js"></script>

<script>

import { mapState } from 'vuex'
import { BarLoader } from '@saeris/vue-spinners'
import axios from 'axios'




export default {
  name: 'Table',
  data(){
        return {
           selectedAn:'',
           show: false,
           ListesGares: [],
           loaded: false,
           pageOfItems: [],
           title:'',
           years:["2019","2018","2017"],
           sortBy: 'Aide',
          sortDesc: false,
        fields: [
          { key: 'gare', },
          { key: 'accompagnement', sortable: true, },
          { key: 'total_voyageur', sortable: true},
        ],

        }
   
  },
  mounted () {
    },
   
  methods: {
    async  filtreDate(){
        let tav=[];
        
        if (this.selectedAn === '') {
                this.error = 'Veuillez remplir tous les champs.'
                  this.selectedAn = ''
                  return false
          }
          this.title=this.selectedAn
            this.show=true;
            this.autre=null;
         await axios
        .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&rows=10&x=gare&y.series1.func=SUM&y.series1.expr=total&sort=series1&refine.datemensuel='+this.selectedAn)
        .then((response) => {
            this.autre=response.data.slice(0,50)
        });

        let self=this;
        this.ListesGares=[];
  await  self.autre.forEach(pv => {
        axios
        .get("https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q="+pv.x+"&sort=total_voyageurs_2019&facet=nom_gare&facet=code_postal")
        .then((response) => {
        if(this.selectedAn==2019){
                 this.ListesGares.push({"total_voyageur":response.data.records[0].fields.total_voyageurs_2019,"gare":response.data.records[0].fields.nom_gare,"accompagnement":pv.series1});


        }else if(this.selectedAn==2018){
                             this.ListesGares.push({"total_voyageur":response.data.records[0].fields.total_voyageurs_2018,"gare":response.data.records[0].fields.nom_gare,"accompagnement":pv.series1});
                             console.log("yes")

        }
        else if(this.selectedAn==2017){
                               this.ListesGares.push({"total_voyageur":response.data.records[0].fields.totalvoyageurs2017,"gare":response.data.records[0].fields.nom_gare,"accompagnement":pv.series1});

        }

         setTimeout(()=>{ 
                this.loaded=true
                this.show = false
        }, 1000)
            
        });

    });
  
    

      },
      
     
      onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        }
    }
  
}

</script>
<style lang="scss" scoped>
* {
  font-family: sans-serif; /* Change your font family */
}
.green-bg {
    background-color:#009879;
  }

b-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

b-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

b-table th,
b-table td {
  padding: 12px 15px;
}

b-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

b-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

b-table tbody tr:last-of-type {
  border-bottom: 2px solid #42b983;
}

b-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
.pagination {
           justify-content: center;
           flex-wrap: wrap;
           padding: 10PX;
}




.btnVal{
  width: 100%;
}


</style>

