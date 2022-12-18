<template>
  <div>
    <bar-chart
      width="500"
      height="500"
      title="Bar Chart"
      legendPosition="right"
      :series="bar.series"
      :categories="bar.categories"
    />
    <column-chart
      width="500"
      height="500"
      title="Bar Chart"
      legendPosition="right"
      :series="bar.series"
      :categories="bar.categories"
    />
  </div>
</template>

<script>
import BarChart from '@/components/chart/BarChart.vue'
import ColumnChart from '@/components/chart/ColumnChart.vue'

export default {
  components: {
    BarChart,
    ColumnChart
  },
  data() {
    return {
      bar: {
        series: [
          {
            name: '매출액',
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          },
          {
            name: '매입액',
            data: [20, 80, 99, 10, 28, 87, 22, 100]
          }
        ],
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
      }
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>
