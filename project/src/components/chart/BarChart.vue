<template>
  <apexchart
    type="bar"
    :width="width"
    :height="height"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
export default {
  components: {},
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    legendPosition: {
      type: String,
      default: 'bottom'
    },
    series: {
      type: Array,
      default: () => []
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'bar'
        },
        xaxis: {
          categories: []
        },
        title: {
          text: this.title,
          align: 'left'
        },
        legend: {
          show: true,
          position: this.legendPosition
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#000']
        }
      }
    }
  },
  setup() {},
  created() {},
  mounted() {
    this.chartOptions.xaxis.categories = this.categories
  },
  unmounted() {},
  methods: {}
}
</script>
