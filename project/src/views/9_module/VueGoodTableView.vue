<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :row-style-class="rowStyleClassFn"
      v-on:row-click="onRowClick"
    >
      <template #table-actions>
        This will show up on the top right of the table.
      </template>
    </vue-good-table>
  </div>
</template>

<script>
export default {
  name: 'my-component',
  data() {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name'
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number'
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy'
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage'
        }
      ],
      rows: [
        {
          id: 1,
          name: 'John',
          age: 20,
          createdAt: '2011-10-20',
          score: 0.03343
        },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343
        },
        {
          id: 3,
          name: 'Susan',
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343
        },
        {
          id: 4,
          name: 'Chris',
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343
        },
        {
          id: 5,
          name: 'Dan',
          age: 40,
          createdAt: '2011-10-21',
          score: 0.03343
        },
        {
          id: 6,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343
        }
      ]
    }
  },
  methods: {
    rowStyleClassFn(row) {
      if (row.age < 18) {
        return 'red'
      } else if (row.age > 18 && row.age < 30) {
        return 'green'
      } else {
        return 'blue'
      }
    },
    onRowClick(row) {
      console.log(row)
    }
  }
}
</script>

<style>
.green {
  background-color: green;
}
.red {
  background-color: red;
}
.blue {
  background-color: blue;
}
</style>
