<template>
  <header id="header--default">
    <div class="container">
      <img
        id="logo-tauli"
        src="images/logo_i3pt_blanc.svg"
        alt="Parc Taulí - Hospital Universitari"
      />
      <router-link id="logout" to="/login">
        <span>Sortir</span>
      </router-link>
    </div>
  </header>
  <nav id="main-nav">
    <ul class="container">
      <li>
        <router-link
          id="list"
          to="/list"
          :class="[$route.name === 'List' ? 'selected' : '']"
        >
          Llista
        </router-link>
      </li>
      <li id="main-nav__add">
        <router-link
          id="add"
          to="/add"
          :class="[$route.name === 'Add' ? 'selected' : '']"
        >
          Afegir
        </router-link>
      </li>
      <li>
        <router-link
          id="mylist"
          to="/mylist"
          :class="[$route.name === 'MyList' ? 'selected' : '']"
        >
          La meva llista
        </router-link>
      </li>
    </ul>
  </nav>
</template>
