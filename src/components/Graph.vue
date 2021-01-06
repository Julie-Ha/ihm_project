<template>
   <div class="graph">
      <b-container class="bv-example-row text-center" style="padding:10px" >
         <b-row style="padding:10px">
            <b-col >
               <h2 style="font-size: 2.1em;" >L'assistance moyenne fournie par les stations au cours d'une année    </h2>
               <!--b-form-group id="input-group-2" >
                  <select v-model="selectedAn" class="selectpicker form-control" >
                                      <option disabled value="">Année</option>
                                      <option v-for="annne in years" :key="annne">{{ annne }}</option>
                  </select>
                  </b-form-group-->
            </b-col>
            <!--b-col cols="5">
               <b-form-group >
               
                  <b-button type="submit" style="background-color: #009879;" @click="filtreGraph()" class="btnVal">rechercher</b-button>
               </b-form-group>
               </b-col-->
         </b-row>
         <b-overlay :show="show"  spinner-variant="success"
            spinner-type="grow"
            spinner-small
            rounded="lg"
            opacity="1"
            >
            <div id="wrapper">
               <div style="padding:10px" id="chart-line2" >
                  <div id="chart">
                     <apexchart v-if="loaded" type="line"  width="100%" height="400" :options="chartOptions" :series="series2"></apexchart>
                  </div>
               </div>
            </div>
            <b-container class="bv-example-row" style="padding:10px">
               <h2 style="font-size: 2.1em;">Pourcentage de personnes à mobilité réduite par rapport au total de voyages en 2019 </h2>
               <p>Les 20 gares qui ont le plus aidé les personnes à mobilité réduite sur l'année 2019 </p>
               <apexchart v-if="loaded" width="100%" height="400"  type="line" 
                  :options="pvOptions" :series="pvSeries"></apexchart>
            </b-container>
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
      selectedAn:null,
      tab:[],
      years:["2020","2019","2018","2017"],
      orther:[],
      items:null,
      valr:null,
      show: false,
      chartOptions: {
            chart: {
              height: 400,
              type: 'line',
              width:"100%",
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 20,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#009879','#77B6EA', '#545454',],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'moyenne',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Août','Sept.','Oct.','Nov.','Déc'],
              title: {
                text: 'Mois'
              }
            },
            yaxis: {
              title: {
                text: "Assistance moyenne fournie"
              },
              min: 1,
              max: 200
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
          series2:null,
    };
  },
  mounted () {
      this.fillData()
    },
  
  methods: {
   
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
    let tav1=[]
    let tav2=[]
    let tav3=[]
    await axios
          .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=datemensuel&y.series1.func=AVG&y.series1.expr=total&refine.datemensuel=2020')
          .then((response) => {
            this.tableau = response.data;

          })
          .catch((e) => {
            this.errors.push(e);
          });
    await  this.tableau.forEach(pv => {

        tav1.push(pv.series1.toFixed(0));
  });


// 2019
    await axios
          .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=datemensuel&y.series1.func=AVG&y.series1.expr=total&refine.datemensuel=2019')
          .then((response) => {
            this.tableau1 = response.data;

          })
          .catch((e) => {
            this.errors.push(e);
          });
    await  this.tableau1.forEach(pv => {
        tav2.push(pv.series1.toFixed(0));
  });
//2018
    await axios
          .get('https://data.sncf.com/api/records/1.0/analyze/?dataset=accompagnement-pmr-gares&x=datemensuel&y.series1.func=AVG&y.series1.expr=total&refine.datemensuel=2018')
          .then((response) => {
            this.tableau3 = response.data;

          })
          .catch((e) => {
            this.errors.push(e);
          });
    await  this.tableau3.forEach(pv => {
     
        tav3.push(pv.series1.toFixed(0));
  });

    
      this.series2= [
            {
              name: "vert - 2020",
              data:tav1
            },
            {
              name: "bleu - 2019",
              data: tav2
            }
            ,
            {
              name: "Cervin - 2018",
              data: tav3
            }
          ]
          
        

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
