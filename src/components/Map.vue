<template>
  <div>
    <h1>Accompagnement de personnes à mobilité réduite dans les gares</h1>
    <div>
      <span v-if="loading">Loading...</span>
      <br />
    </div>
    <l-map :zoom="zoom" :center="center" style="height: 500px; width: 100%">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-geo-json
        v-if="show"
        :geojson="geojson"
        :options="options"
        :options-style="styleFunction"
      />
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
import axios from "axios";

export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 6,
      center: [48, -1.219482],
      geojson: null,
      fillColor: "#e4ce7f",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    };
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction,
      };
    },
    styleFunction() {
      const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
      return () => {
        return {
          weight: 2,
          color: "#ECEFF1",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1,
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>Ville: " +
            feature.properties.name +
            "</div><div>Total: " +
            feature.properties.total +
            "</div>",
          { permanent: true, sticky: true }
        );
      };
    },
  },
  async created() {
    this.loading = true;

    let gares = [];
    await axios
      .get(
        "https://data.sncf.com/api/records/1.0/search/?dataset=accompagnement-pmr-gares&q=2020-01&sort=total&rows=10"
      )
      .then((response) => {
        gares = response.data.records;
      })
      .catch((e) => {
        this.errors.push(e);
      });

    let json = [];
    gares.forEach(async (gare) => {
      let name = gare.fields.gare.split(" ")[0];
      const response = await fetch(
        "https://api-adresse.data.gouv.fr/search/?q=" + name
      );
      let j = await response.json();
      j.features[0].properties.total = gare.fields.total;

      let found = false;
      json.forEach(async (js) => {
        if (j.features[0].properties.city == js.properties.city) {
          js.properties.total = parseInt(js.properties.total)+parseInt(j.features[0].properties.total);
          found = true;
        }
      });

      if (!found) {
        json.push(j.features[0]);
      }
    });
    console.log(json);

    this.geojson = json;
    this.loading = false;
  },
};
</script>
