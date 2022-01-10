<template>
    <v-app id="inspire">
        <!-- <SystemBar /> -->

        <AppBar />

       <div class="customer">
            <Fillter />

            <ListCustomer />
       </div>
    </v-app>
</template>

<script>
// import SystemBar from './Authchat/SystemBar.vue';
import AppBar from "../baseComponents/AppBar.vue";
import Fillter from "../components/Customer/Fillter.vue";
import ListCustomer from "../components/Customer/ListCustomer.vue"

export default {
    name: "chat",
    data: () => ({
    }),
    components: {
        // SystemBar,
        AppBar,
        Fillter,
        ListCustomer
        // Menu,
    },
};
</script>
<style lang="scss" scoped>
#inspire {
    background: #f9fafc;
    .customer {
        background: #ffffff;
    padding: 24px;
    margin: 30px;
    margin-top: 96px;
    border-radius: 10px;
    }
}

</style>