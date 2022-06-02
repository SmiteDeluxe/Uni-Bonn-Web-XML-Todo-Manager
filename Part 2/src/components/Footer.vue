<template>
    <!-- Abgabe von *** *** und *** *** -->
    <footer>
        <p>Copyright &copy; by *** *** & *** ***
            <time datetime="2021">2021</time>
        </p>
    </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
  }
};
</script>

<style scoped>
footer {
    grid-area: footer;
    background-color: white;
    text-align: center;
}


@media screen and (max-width: 700px){
    footer{
        font-size:14px;
    }
}
</style>