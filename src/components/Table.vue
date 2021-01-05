<template>
   <div class="table">
 
      <b-container class="bv-example-row" style="padding:10px">
      <b-container>
                  <h3 class="text-center">Representation de</h3>
        </b-container>
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
               
                  <b-button type="submit" variant="primary" @click="filtreDate()" class="btnVal">rechercher</b-button>
               </b-form-group>
            </b-col>
         </b-row>
         <b-row style="padding:10px">
            <b-col >
               
               <b-list-group-item class="d-flex justify-content-between align-items-center">
                  Avoir plus de Filtre <router-link to="/TableFiltre" class="p-2"><b-icon icon="plus-circle-fill" scale="2" variant="info" class="control"></b-icon></router-link>
                  
               </b-list-group-item>
            </b-col>
      
         </b-row>
       
      </b-container>
      
  

      <div v-if="ListesGares" >
       <b-overlay :show="show"  spinner-variant="success"
      spinner-type="grow"
      spinner-small
      rounded="lg"
      >
         <b-container>
            <h3 class="text-center">Les 50 Gares qui ont fourni le plus d'aide et le nombre de voyageurs qu'ils ont reçus au cours de l'année {{title}}</h3>

         <b-table
            :items="pageOfItems"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            sort-icon-left
            responsive="sm"
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
           pageOfItems: [],
           title:'',
           years:["2019","2018","2017"],
           sortBy: 'Aide',
          sortDesc: false,
        fields: [
          { key: 'gare', sortable: true },
          { key: 'accompagnement', sortable: true },
          { key: 'total_voyageur', sortable: true },
        ],

        }
   
  },
  async created() {
      
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
         await axios
        .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&rows=10&x=gare&y.series1.func=SUM&y.series1.expr=total&sort=series1&refine.datemensuel='+this.selectedAn)
        .then((response) => {
            this.autre=response.data.slice(0,50)
        });

        let self=this;
  await  self.autre.forEach(pv => {
        axios
        .get("https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q="+pv.x+"&sort=total_voyageurs_2019&facet=nom_gare&facet=code_postal")
        .then((response) => {
        if(this.selectedAn==2019){
          setTimeout(()=>{ 
                              this.ListesGares.push({"total_voyageur":response.data.records[0].fields.total_voyageurs_2019,"gare":response.data.records[0].fields.nom_gare,"accompagnement":pv.series1});

                this.show = false
        }, 2000)

        }else if(this.selectedAn==2018){
          setTimeout(()=>{ 
                             this.ListesGares.push({"total_voyageur":response.data.records[0].fields.total_voyageurs_2018,"gare":response.data.records[0].fields.nom_gare,"accompagnement":pv.series1});
                this.show = false
        }, 1000)

        }
        else if(this.selectedAn==2017){
          setTimeout(()=>{ 
                               this.ListesGares.push({"total_voyageur":response.data.records[0].fields.totalvoyageurs2017,"gare":response.data.records[0].fields.nom_gare,"accompagnement":pv.series1});

                this.show = false
        }, 1000)

        }
         
            
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

.content-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  border-radius: 5px 5px 0 0;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.content-table thead tr {
  background-color: #009879;
  color: #ffffff;
  text-align: left;
  font-weight: bold;
}

.content-table th,
.content-table td {
  padding: 12px 15px;
}

.content-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.content-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.content-table tbody tr:last-of-type {
  border-bottom: 2px solid #009879;
}

.content-table tbody tr.active-row {
  font-weight: bold;
  color: #009879;
}
.pagination {
           justify-content: center;
           flex-wrap: wrap;
           padding: 10PX;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 10px;
  color: #009879;
  font-size: 16px;
  text-decoration: none;
  overflow: hidden;
  transition: .5s;
}

.login-box a:hover {
  background: #009879;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #009879,
              0 0 25px #009879,
              0 0 50px #009879,
              0 0 100px #009879;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #009879);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #009879);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #009879);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #009879);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
.btnVal{
  width: 100%;
}


</style>

