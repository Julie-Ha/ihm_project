<template>
   <div class="graph">
      <b-container class="bv-example-row text-center" style="padding:10px" >
         <!--b-row style="padding:10px">
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
               
                  <b-button type="submit" style="background-color: #009879;" @click="filtreGraph()" class="btnVal">rechercher</b-button>
               </b-form-group>
            </b-col>
            </b-row-->
         <b-overlay :show="show"  spinner-variant="success"
            spinner-type="grow"
            spinner-small
            rounded="lg"
            opacity="1"
            >
            <b-container class="bv-example-row" style="padding:10px">
               <h2 style="font-size: 2.1em;">Pourcentage de personnes à mobilité réduite par rapport au total de voyages en 2019 </h2>
               <p>Les 20 gares qui ont le plus aidé les personnes à mobilité réduite sur l'année 2019 </p>
               <apexchart v-if="loaded" width="100%" height="500px"  type="line" 
                  :options="pvOptions" :series="pvSeries"></apexchart>
            </b-container>
            <b-container class="bv-example-row" style="padding:10px">
               <h2 style="font-size: 2.1em;" >Nombre total d'aides fournies par les gares de 2015 à 2020</h2>
               <apexchart v-if="loaded" width="100%" type="pie" 
                  :options="catOptions" :series="catSeries"></apexchart>
            </b-container>
            <div style="padding:10px" >
               <h2 style="font-size: 2.1em;" >Top 50 de l'aide moyenne fournie par les stations de 2015 à 2020  </h2>
               <apexchart v-if="loaded" width="100%" height="500"  type="line" 
                  :options="pvOptions1" :series="pvSeries1" ></apexchart>
            </div>
         </b-overlay>
      </b-container>
   </div>
</template>


<script>
import axios from "axios";



export default {
  name: 'Graph',
  data() {
    return {
      loaded: false,
      pvOptions: null,
      pvSeries: null,
      pvOptions1: null,
      pvSeries1: null,
      catOptions: null,
      catSeries: null,
      visitorOptions: null,
      visitorSeries: null,
      selectedAn:null,
      tab:[],
      years:["2019","2018","2017"],
      orther:[],
      items:null,
      valr:null,
      show: false,
    };
  },
  mounted () {
      this.fillData()
    },
  
  methods: {
    async  filtreGraph(){
       if (this.selectedAn === '') {
                this.error = 'Veuillez remplir tous les champs.'
                  this.selectedAn = ''
                  return false
          }
      this.show = true;
      this.pvOptions = {
        xaxis: {
          categories: []
        }
      };

      this.pvSeries = [{
        name: "Pourcentage",
        data: [],
      }];

    this.pvOptions1 = {
      xaxis: {
        categories: []
      }
    };

    this.pvSeries1 = [{
      name: "moyenne",
      data: [],
    }];
    this.pvOptions.xaxis.categories= []
    this.pvSeries[0].data= []
    console.log("azerty",this.pvSeries[0].data)

    this.autre=null;
    await axios.get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&rows=10&x=gare&y.series1.func=SUM&y.series1.expr=total&sort=series1&refine.datemensuel='+this.selectedAn)
      .then((response) => {
        this.autre = response.data.slice(0, 20)

      });
   

      await this.autre.forEach(pv => {
        axios.get("https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q=" + pv.x + "&sort=total_voyageurs_2019&facet=nom_gare&facet=code_postal")
          .then((response) => {
            if(this.selectedAn==2019){
              this.pvOptions.xaxis.categories.push([response.data.records[0].fields.nom_gare]);
              this.pvSeries[0].data.push(((Math.round(pv.series1 * 100)) / response.data.records[0].fields.total_voyageurs_2019).toFixed(2));
            }else if(this.selectedAn==2018){
              this.pvOptions.xaxis.categories.push([response.data.records[0].fields.nom_gare]);
              this.pvSeries[0].data.push(((Math.round(pv.series1 * 100)) / response.data.records[0].fields.total_voyageurs_2018).toFixed(2));
            }else if(this.selectedAn==2017){
              this.pvOptions.xaxis.categories.push([response.data.records[0].fields.nom_gare]);
              this.pvSeries[0].data.push(((Math.round(pv.series1 * 100)) / response.data.records[0].fields.totalvoyageurs2017).toFixed(2));
            }
          });

      });


    await axios
      .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=gare&y.series1.func=AVG&y.series1.expr=total&sort=series1')
      .then((response) => {
        this.pageViewsByCategory = response.data.slice(0, 50);

      })
      .catch((e) => {
        this.errors.push(e);
      });

    await axios
      .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=gare&y.series1.func=SUM&y.series1.expr=total&sort=series1')
      .then((response) => {
        this.tableau = response.data;

      })
      .catch((e) => {
        this.errors.push(e);
      });



      this.catOptions = {
        labels: []
      };

      this.catSeries = [];

      this.catOptions = {
        labels: []
      };

      this.catSeries = [];

      await this.pageViewsByCategory.forEach(pv => {
        // this.catOptions.labels.push(pv.x);
        // this.catSeries.push(pv.series1);
        this.pvOptions1.xaxis.categories.push(pv.x);
        this.pvSeries1[0].data.push(pv.series1.toFixed(0));
        // this.pvSeries[0].name.push(pv.fields.gare);
      });
      //this.tableau
      await this.tableau.forEach(pv => {
        this.catOptions.labels.push(pv.x);
        this.catSeries.push(pv.series1);
        //this.pvOptions1.xaxis.categories.push(pv.x);
        // this.pvSeries1[0].data.push(pv.series1.toFixed(0));
        // this.pvSeries[0].name.push(pv.fields.gare);
      });

      await setTimeout(() => {
        this.loaded = true,
          this.show = false;
      }, 500)

      },
    async fillData(){
      
      this.show=true;
      this.pvOptions = {
          xaxis: {
              categories: []
            }
          };

          this.pvSeries = [
            {
              name: "Pourcentage",
              data: [],
            // data2: [],
            }
          ];
           this.pvOptions1 = {
          xaxis: {
              categories: []
            }
          };

          this.pvSeries1 = [
            {
              name: "moyenne",
              data: [],
            // data2: [],
            }
          ];
      await axios.get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&rows=10&x=gare&y.series1.func=SUM&y.series1.expr=total&sort=series1&refine.datemensuel=2019')
            .then((response) => {
                this.autre=response.data.slice(0,20)
                                console.log(this.autre)

            });
  await   this.autre.forEach(pv => {
     axios.get("https://data.sncf.com/api/records/1.0/search/?dataset=frequentation-gares&q="+pv.x+"&sort=total_voyageurs_2019&facet=nom_gare&facet=code_postal")
        .then((response) => {
            this.pvOptions.xaxis.categories.push([response.data.records[0].fields.nom_gare]);
            this.pvSeries["name"]=response.data.records[0].fields.total_voyageurs_2019;
            this.pvSeries[0].data.push(((Math.round(pv.series1*100))/response.data.records[0].fields.total_voyageurs_2019).toFixed(2));
             
                
            
        });
     
    });
    
  
    // 

   
   await  axios
        .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=gare&y.series1.func=AVG&y.series1.expr=total&sort=series1')
        .then((response) => {
           this.pageViewsByCategory = response.data.slice(0,50);
        
        })
        .catch((e) => {
          this.errors.push(e);
        });

  await  axios
        .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=gare&y.series1.func=SUM&y.series1.expr=total&sort=series1')
        .then((response) => {
           this.tableau = response.data;
        
        })
        .catch((e) => {
          this.errors.push(e);
        });
        
 
   /* this.pageViews.forEach(pv => {
      this.pvOptions.xaxis.categories.push([pv.fields.datemensuel,pv.fields.gare]);
      this.pvSeries[0].data.push(pv.fields.total);
     // this.pvSeries[0].name.push(pv.fields.gare);
    });*/

    this.catOptions = {
      labels: []
    };

    this.catSeries = [];

    this.catOptions = {
      labels: []
    };

    this.catSeries = [];

  await  this.pageViewsByCategory.forEach(pv => {
       // this.catOptions.labels.push(pv.x);
       // this.catSeries.push(pv.series1);
        this.pvOptions1.xaxis.categories.push(pv.x);
       this.pvSeries1[0].data.push(pv.series1.toFixed(0));
     // this.pvSeries[0].name.push(pv.fields.gare);
    });
//this.tableau
 await  this.tableau.forEach(pv => {
        this.catOptions.labels.push(pv.x);
        this.catSeries.push(pv.series1);
        //this.pvOptions1.xaxis.categories.push(pv.x);
       // this.pvSeries1[0].data.push(pv.series1.toFixed(0));
     // this.pvSeries[0].name.push(pv.fields.gare);
    });

    this.visitorOptions = {
      chart: {
        stacked: true
      },
      xaxis: {
        categories: []
      }
    };

   await  setTimeout(()=>{     
                  this.loaded = true,
                  this.show=false;  
           }, 1000)
   
 
        
  
  }
    
}
}
  

</script>

<style lang="scss" scoped>
.apexcharts-canvas apexchartsx0e2swib apexcharts-theme-light{
  height:700px
}
</style>
