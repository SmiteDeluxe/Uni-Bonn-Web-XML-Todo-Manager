<template>
    <!-- Abgabe von *** *** und *** *** -->
    <button id="menu" 
        @keydown.space="menuopen" 
        @keydown.enter="menuopen">
    </button>
    <nav id="actions_nav" 
        :class="[showmenu ? 'shownav' : 'hidenav']">
        <ul id="actions">
            <li tabindex="0" class="nav_item unselectable" id="new" 
                @keydown.space="newtask"
                @keydown.enter="newtask" 
                @click="newtask">
                <span> New </span>
            </li>
            <li tabindex="0" class="nav_item unselectable" id="list_mobile"
                @keydown.space="listtasks" 
                @keydown.enter="listtasks" 
                @click="listtasks"> Next<br/> Tasks
            </li>
            <!-- <li tabindex="0" class="nav_item unselectable" id="loginbtn_mobile">Login</li>
            <li tabindex="0" class="nav_item unselectable" id="registerbtn_mobile">Register</li> -->
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Nav',
  props: {
  },
  methods: {
      newtask: function() {
          this.$emit("newtask");
          this.showmenu = false;
      },
      listtasks: function(){
          this.$emit("listtasks");
          this.showmenu = false;
      },
      menuopen: function() {
          this.showmenu = !this.showmenu;
      }
  },
  emits: ["newtask", "listtasks"],
  data: function() {
      return {
          showmenu: false,
      };
  }
};
</script>

<style scoped>
#menu {
    background-image: url(../assets/menu.png);
    background-size: contain;
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    height: 80px;
    width: 40px;
    margin-left: 30px;
    cursor: pointer;
    display: none;
}

.shownav {
    width: 150px !important;
}
.hidenav {
    width: 0px;
}

/*Nav-Bar links*/
#actions_nav {
    background-color: rgb(255, 255, 255);
    height: 110%;
    overflow: hidden;
    width: 100%;
    margin-left: -10px;
    margin-top: -10px;
    padding-top: 20px;
}

#actions {
    list-style-type: none;
    padding: 0px;
    margin: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.nav_item {
    width: 100%;
    height: 50px;
    padding-top: 15px;
    background-color: white;
    width: 100%;
}

.nav_item:hover{
    background-color: #fddb5e;
    cursor: pointer;
}

.nav_item:active {
    background-color: #FFD333;
}

#loginbtn_mobile, #registerbtn_mobile, #list_mobile{
    display: none;
}

#list_mobile {
    height: 70px;
}

@media screen and (orientation: landscape) and (max-height: 700px) {
    
    #actions_nav {
        position: absolute;
        width:0px;
        height: 102%;
        background-color: white;
        text-align: left;
        top:0;
        z-index: 2;
        transition: width 0.2s;
    }

    #actions_nav ul li{
        display: block;
    }
}

@media screen and (max-height: 670px) {
    #menu {
        display: block;
        margin-top: -50px;
    }
}

@media screen and (max-width: 681px) {
     #loginbtn_mobile, #registerbtn_mobile{
        display: block;
    }
}

@media screen and (min-height: 1000px) {
    #menu {
        margin-top: -85px;
        margin-left: 40px;
    }
}
@media screen and (orientation: landscape) and (max-height: 700px) {
    #menu {
        position: absolute;
        display: block;
        margin-top: -70px;
        z-index: 2;
    }
}

@media screen and (orientation: landscape) and (max-height: 410px) {
    #menu {
        position: absolute;
        display: block;
        margin-top: -50px;
        z-index: 2;
    }
}

@media screen and (max-width: 1025px) {
    #actions_nav {
        position: absolute;
        width:0px;
        height: 102%;
        background-color: white;
        text-align: left;
        top:0;
        z-index: 2;
        transition: width 0.2s;
    }

    #new, #list_mobile{
        display: block;
    }

    #menu{
        position: absolute;
        display: block;
        margin-top: -60px;
        z-index: 2;
    }

    #menu:hover ~ #actions_nav{
        width: 150px;
    }

    #actions_nav:hover{
        width: 150px;
    }
}
@media screen and (orientation: landscape) and (max-height: 700px){
    #menu:hover ~ #actions_nav{
        width: 150px;
    }

    #actions_nav:hover{
        width: 150px;
    }
}
</style>
