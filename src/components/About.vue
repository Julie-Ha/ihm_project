<template>
  <div id="about">
    <b-container class="bv-example-row" style="padding:20px">
      <p>
        Cette application utilise les données de la SNCF concernant
        l'accompagnement de personnes à mobilité réduite dans les gares. Elle a
        pour but de bien visualiser où se trouve les besoins pour les personnes
        à mobilité réduite et à quelle période de l'année. Cette application
        peut par exemple permettre d'évaluer le cout investi par la SNCF pour
        aider les personnes à mobilité réduite ou bien de mieux répartir le
        budget, les matériels, les employés pour ces personnes.
      </p>
      <p>
        Données :
        <a
          href="https://data.sncf.com/explore/dataset/accompagnement-pmr-gares/table/?sort=datemensuel"
          >https://data.sncf.com/explore/dataset/accompagnement-pmr-gares/table/?sort=datemensuel</a
        >
      </p>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
