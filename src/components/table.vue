<template>
  <div class="app">
    <b-container>
       <vuetable ref="vuetable"
          api-url="https://vuetable.ratiw.net/api/users"
          :fields="fields"
        ></vuetable>
    </b-container>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  components: {
    Vuetable
  },
  data () {
    return {
      fields: [
        'name', 'email',
        {
          name: 'birthdate',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        },
        {
          name: 'nickname',
          callback: 'allcap'
        },
        {
          name: 'gender',
          titleClass: 'center aligned',
          dataClass: 'center aligned',
          callback: 'genderLabel'
        },
        {
          name: 'salary',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        }
      ]
    }
  },
  methods: {
    allcap (value) {
      return value.toUpperCase()
    },
    genderLabel (value) {
      return value === 'M'
        ? '<span class="label label-info"><i class="glyphicon glyphicon-star"></i> Male</span>'
        : '<span class="label label-success"><i class="glyphicon glyphicon-heart"></i> Female</span>'
    }
  }
}
</script>

<style>

</style>
