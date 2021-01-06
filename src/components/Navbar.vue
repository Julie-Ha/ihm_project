<template>
  <div id="app">
    <b-navbar
      toggleable="lg"
      type="dark"
      style="background-color: #009879;"
      class="fix-top"
    >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <div class="menu">
          <b-navbar-nav>
            <b-nav-item-dropdown text="Données" right>
              <b-dropdown-item href="#" class="dropdown-mine" variant="success"
                ><b-nav-item to="/tablefiltre" class="dark"
                  >Nombre d'aides par gare par période</b-nav-item
                ></b-dropdown-item
              >
              <b-dropdown-item href="#" class="dropdown-mine"
                ><b-nav-item to="/table" class="dark"
                  >Comparaison avec le total de voyageurs</b-nav-item
                ></b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item to="/map">Carte</b-nav-item>
            <b-nav-item to="/graph">Graphes</b-nav-item>
            <b-nav-item to="/about">A propos</b-nav-item>
          </b-navbar-nav>
        </div>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>
<style lang="scss">
.fix-top {
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

.dark .nav-link {
   color: #009879 !important;
}
</style>
