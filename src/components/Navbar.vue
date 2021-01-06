<template>
   <div id="app">
      <b-navbar toggleable="lg" type="dark" style="background-color: #009879;" class="fix-top">
         <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
         <b-collapse id="nav-collapse" is-nav>
            <div class="menu">
               <b-navbar-nav>
                  <b-nav-item to="/table" class="active">Tableau <span class="sr-only">(current)</span> </b-nav-item>
                  <b-nav-item to="/map" >Carte</b-nav-item>
                  <b-nav-item to="/graph" >Graphes</b-nav-item>
                  <b-nav-item to="/about" >A propos</b-nav-item>
               </b-navbar-nav>
            </div>
         </b-collapse>
      </b-navbar>
      <router-view/>
   </div>
</template>

<script>


export default {
  name: "Navbar",
 
};
</script>
<style lang="scss">
 .fix-top{
        margin-top: -63px; 
    }
.menu {
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    color: #fff;
    font-size: 1.6rem;
    

}
</style>
