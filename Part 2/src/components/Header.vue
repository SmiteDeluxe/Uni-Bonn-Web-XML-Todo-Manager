<template>
    <!-- Abgabe von *** *** und *** *** -->
    <header> 
        <h1>Tasks</h1>
        <div id="user">
            <span id="user_name">{{ user_name }}</span>
            <p id="user_id">{{ user_id }}</p>
        </div>
        <div id="userbtn_wrapper">
        <button class="btn" id="userbtn" title="User button"></button>
        <!--<nav class="dropdown_content">
            <div id="triangle"></div>
            <ul id="useraction_list">
                <li id="logoutbtn">Logout</li>
                <li class="unselectable" id="loginbtn">Login</li>
                <li class="unselectable" id="registerbtn">Register</li>
            </ul>
        </nav>-->
        </div>
    </header>
    <div id="popup">
        <form id="log_wind">
            <input type="text" class="log_inp" placeholder="Username" />
            <input type="password" class="log_inp" placeholder="Password"/>
            <!-- for Register page 
                <input type="password" class="log_inp" placeholder="Repeat Password"></input>
            -->
            <button class="btn" id="submitbtn">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    user_id: Number,
    user_name: String,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
    grid-area: header;
    background-color: white;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}
header h1 {
    text-align: center;
    flex:4;
}
#userbtn_wrapper {
    height: 50px;
    width: 100px;
    margin-left: 20px;
    margin-top: -8px;
    position: relative;
}

#userbtn {
    background-color: transparent;
    background: url(../assets/User-512.png) no-repeat;
    background-size: 100%;
    width: 50px;
    height: 50px;
}

#user{
    margin-top: -17px;
    position: relative;
}

#user_id{
    position: absolute;
    right: 0;
    font-size: 17px;
    font-weight: lighter;
    color: rgb(107, 107, 107);
    margin-top: -5px;
    text-decoration: wavy;
    font-style: italic;
}

#logoutbtn{
    display: block;
}

#loginbtn{
    display: block;
}
#loginbtn_mobile{
    display: none;
}

#registerbtn{
    display: block;
}

#registerbtn_mobile{
    display: none;
}
.dropdown_content{
    display: none;
    z-index: 2;
    border-radius: 5px;
    min-width: 120px;
    position: absolute;
    right: 40px;
    top:40px;
}

#userbtn_wrapper:hover .dropdown_content {
    display: block;
}

#triangle {
    width: 0px;
    height: 0px;
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
    border-style: solid;
    border-width: 0 15px 10px 15px;
    margin-top: 40px;
    margin-left: 68px;
    margin-bottom: -21px;
    border-color: transparent transparent #ffffff transparent;
}

#useraction_list {
    background-color: white;
    height: 90px;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 5px;
    text-align: center;
}

#useraction_list li {
  height: 40px;
  width: 100%;
}
#loginbtn {
  padding-top: 7px;
  margin-top: -4px;
  border-radius: 5px 5px 0px 0px;
}
#registerbtn {
  padding-top: 7px;
  margin-bottom: -4px;
  border-radius: 0px 0px 5px 5px;
}
#useraction_list * {
    cursor: pointer;
}
#useraction_list *:hover {
    background-color: #fddb5e;
}
#useraction_list *:active {
    background-color: #FFD333;
}


/*CSS für das Login/Register-Fenster*/

#popup{
    z-index: 1;
    grid-area: main;
    width: 100%;
    height: 100%;
    background-color: rgb(248, 248, 248);
    display: none;
    flex-direction: column;
    justify-content: center;
}

.log_inp {
    border-bottom: 2px solid rgb(175, 175, 175);
    border-top: none;
    border-left: none;
    border-right: none;
    background-color: rgb(248, 248, 248);
    padding: 5px 5px 5px 5px;
    font-size: 16px;
    margin-bottom: 20px;
}
.log_inp:focus {
    outline:none;
}


#log_wind {
    padding-top: 40px;
    margin: auto;
    width: 200px;
    height: 300px;
    text-align: center;
}

#submitbtn{
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}
#submitbtn:hover{
    background-color: #fddb5e;
    cursor: pointer;
}

#submitbtn:active {
    background-color: #FFD333;
}

@media screen and (max-width: 681px) {
    header h1 {
        padding-left: 0% !important;
    }
}

@media screen and (max-height: 1000px) {
    #userbtn {
        width: 40px;
        height: 40px;
        margin-top: 10px;
    }
    .btn {
        height: 40px;
    }
}

@media screen and (orientation: landscape) and (max-height: 700px) {
  header {
          z-index: 2;
          display: flex;
  }
  #loginbtn_mobile, #registerbtn_mobile {
        display: none !important;
  }
  #menu{
        position: absolute;
        display: block;
        margin-top: -60px;
        z-index: 2;
  }
  
  #menu:hover ~ #actions_nav{
      left: 0px;
  }

  #actions_nav:hover{
      left: 0px;
  }
}

@media screen and (max-width: 1025px) {
  .dropdown_content {
        top: 50px;
  }
  
  header h1 {
      padding-left: 100px;
  }

  #loginbtn_mobile, #registerbtn_mobile {
        display: none !important;
  }
}

@media  screen and (orientation: portrait) and (max-width: 681px) {
  #loginbtn_mobile, #registerbtn_mobile {
        display: block !important;
  }
  
  #userbtn_wrapper, #user{
      display:none;
  }
}

@media screen and (orientation: landscape) and (max-width: 671px) {
    #loginbtn_mobile, #registerbtn_mobile {
        display: block !important;
    }

    #userbtn_wrapper, #user{
        display:none;
    }

}
</style>
