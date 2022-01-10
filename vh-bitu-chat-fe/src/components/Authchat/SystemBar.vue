<template>
    <v-system-bar app>
      <v-spacer></v-spacer>

      <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon>
    </v-system-bar>
</template>

<script>
export default {
    name: 'vh-system-bar',
    data: () => ({ drawer: null }),
}
</script>