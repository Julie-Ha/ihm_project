<template>
   <div class="TableFiltre">
 
      <b-container class="bv-example-row" style="padding:10px">
         <b-row style="padding:10px">
            <b-col >
               <b-form-group id="input-group-2" >
                  <b-form-input
                     id="input-2"
                     v-model="NameGare"
                     placeholder="Entrez le nom d'une Gare"
                     required
                     ></b-form-input>
               </b-form-group>
            </b-col>
            <b-col cols="5">
               <b-form-group >
                  <b-button type="submit" style="background-color: #009879;" @click="searchStation()" class="btnVal">rechercher</b-button>
               </b-form-group>
            </b-col>
         </b-row>
         <b-row style="padding:10px">
            <b-col>
               <b-list-group-item class="d-flex justify-content-between align-items-center">
                  Afficher les meilleures stations d'une année
                  <b-icon icon="plus-circle-fill" scale="2" variant="info" v-on:click="seen1 = !seen1" class="control"></b-icon>
               </b-list-group-item>
               <div v-if="seen1" id="hide">
                  <b-container>
                     <div class="login-box">
                        <form style="padding:20px">
                           <div class="form-row">
                              <div class="form-group col-md-6">
                                 <select  v-model="selectedAn" class="selectpicker form-control" >
                                    <option disabled value=""  >Année</option>
                                    <option v-for="annne in years" :key="annne">{{ annne }}</option>
                                 </select>
                              </div>
                              <div class="form-group col-md-6">
                                 <a @click="filtreDate()">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 rechercher
                                 </a>
                              </div>
                           </div>
                        </form>
                     </div>
                  </b-container>
               </div>
            </b-col>
            <b-col>
               <b-list-group-item class="d-flex justify-content-between align-items-center">
                  Filtrer en sélectionnant le  mois et l'année
                  <b-icon icon="plus-circle-fill" scale="2" variant="info" v-on:click="seen = !seen" class="control"></b-icon>
               </b-list-group-item>
               <div class="row">
                  <b-container>
                     <div v-if="seen" id="hide"  class="login-box">
                        <form style="padding:20px">
                           <div class="form-row">
                              <div class="col-md-6">
                                 <div class="form-group">
                                    <select v-model="selectedM" class="selectpicker form-control">
                                       <option disabled value="">Mois</option>
                                       <option value="01">Jan.</option>
                                       <option value="02">Fev.</option>
                                       <option value="03">Mars</option>
                                       <option value="04">Avr.</option>
                                       <option value="05">Mai</option>
                                       <option value="06">Juin</option>
                                       <option value="07">Juill.</option>
                                       <option value="08">Août</option>
                                       <option value="09">Sept.</option>
                                       <option value="10">Oct.</option>
                                       <option value="11">Nov.</option>
                                       <option value="12">Déc.</option>
                                    </select>
                                 </div>
                              </div>
                              <div class="col-md-6 ">
                                 <div class="form-group">
                                    <select v-model="selected" class="selectpicker form-control" >
                                       <option disabled value="">Année</option>
                                       <option v-for="annne in years" :key="annne">{{ annne }}</option>
                                    </select>
                                 </div>
                              </div>
                              <div class="form-group col-md-6">
                                 <a @click="filtreDateMonth()">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 <span></span>
                                 rechercher
                                 </a>
                              </div>
                           </div>
                        </form>
                     </div>
                  </b-container>
               </div>
            </b-col>
         </b-row>
      </b-container>
      
      <div v-if="listGar" >
        <b-overlay :show="show"  spinner-variant="success"
      spinner-type="grow"
      spinner-small
      rounded="lg"
      >
         <b-container>
            <div class="row">
               <b-container>
                  <h3 class="text-center">{{titre}}</h3>
               </b-container>
               <div class="col-12 ">
                  <div class="table-responsive">
                     <table class="content-table table tablesorter">
                        <thead>
                           <tr class="text-center" >
                              <th>N°</th>
                              <th>Nom Gare</th>
                              <th>Assistance totale fournie</th>
                              <th>Période</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for=" (gars,index) in pageOfItems " :key="index" class="active-row text-center"  >
                              <td >{{ index +1 }}</td>
                              <td >{{ gars.fields.gare }}</td>
                              <td >{{ gars.fields.total }}</td>
                              <td >{{ gars.fields.datemensuel | date  }}</td>
                           </tr>
                        </tbody>
                     </table>
                     <div  class="pagination">
                        <jw-pagination :items="listGar"  @changePage="onChangePage" ></jw-pagination>
                     </div>
                  </div>
               </div>
            </div>
         </b-container>
      </b-overlay>
      </div>

      <div v-else-if="ListesGare">
       <b-overlay :show="show"  spinner-variant="success"
      spinner-type="grow"
      spinner-small
      rounded="lg"
      >
         <b-container>
            <div class="row">
               <b-container>
                  <h3 class="text-center">{{titre}}</h3>
               </b-container>
               <div class="col-12 ">
                  <div class="table-responsive">
                     <table class="content-table table tablesorter">
                        <thead>
                           <tr class="text-center" >
                              <th>N°</th>
                              <th>Nom Gare</th>
                              <th>Assistance totale fournie</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for=" (gars,index) in pageOfItems " :key="index" class="active-row text-center" >
                              <td >{{ index +1 }}</td>
                              <td >{{ gars.x }}</td>
                              <td >{{ gars.series1 }}</td>
                              <td ></td>
                           </tr>
                        </tbody>
                     </table>
                     <div  class="pagination">
                        <jw-pagination :items="ListesGare"  @changePage="onChangePage" ></jw-pagination>
                     </div>
                  </div>
               </div>
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



export default {
  name: 'TableFiltre',
  data(){
        return {
           selected: '',
           selectedM:'',
           selectedAn:'',
           selectAn:'',
           NameGare:'',
           dataAll:'',
           isBusy: false,
           show: false,
           listGare: [],
           ListesGares: [],
           pageOfItems: [],
           years:["2020","2019","2018"],
           seen: false,
           seen1: false,

        }
   
  },
   mounted () {
    
    this.$store.dispatch('Liste')
  },
  computed: mapState([
    'listGar',
    'ListesGare',
    'titre'
  ]),
  
  methods: {
    async  filtreDate(){
      
        if (this.selectedAn === '') {
                this.error = 'Veuillez remplir tous les champs.'
                  this.selectedAn = ''
                  return false
            }
            this.show=true;
         this.$store.dispatch('ListeAnne',this.selectedAn);
        
          setTimeout(()=>{     
                 this.show = false
        }, 1000)



      },
     async  filtreDateMonth(){
        if (this.selected === '' && this.selectedM === '') {
                this.error = 'Veuillez remplir tous les champs.'
                this.selected = '',
                this.selectedM =''
                  return false
            }
            this.show=true;
            this.dataAll=this.selected+'-'+this.selectedM
            this.$store.dispatch('ListeMonth',this.dataAll)

           setTimeout(()=>{     
                 this.show = false
        }, 1000)
 
      },
      async  searchStation(){
        if ( this.NameGare === '') {
                this.error = 'Veuillez remplir tous les champs.'
                  this.NameGare=''
                  return false
            }
          this.show=true;
          this.$store.dispatch('Listesearch',this.NameGare),
        
        setTimeout(()=>{     
                 this.show = false
        }, 1000)
        
       


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

