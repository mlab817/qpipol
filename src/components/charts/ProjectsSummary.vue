<template>
  <div class="row">
    <figure>
      <e-charts
        :options="projectsSummary"
        :init-options="initOptions"
        ref="pie"
        autoresize
      />
    </figure>

    <figure>
      <e-charts
        :options="series2"
        :init-options="initOptions"
        ref="pie2"
        autoresize
      />
    </figure>
  </div>
</template>

<script>
  import { ALL_PROJECTS } from '@/graphql'
  import qs from 'qs'

  function randomize () {
    return [0, 0, 0].map(v => {
      return Math.round(300 + Math.random() * 700) / 10
    })
  }

  export default {
    name: 'ProjectsSummary',
    apollo: {
      allProjects: {
        query: ALL_PROJECTS
      }
    },
    computed: {
      series2() {
        const projects = this.allProjects

        // const byFundingSource = []
        const byFundingSource = _.chain(projects).groupBy('main_funding_source.name').map((value, key) => {
          return {
            name: key,
            value: _.sumBy(value, 'investment_target_total')
          }
        }).value()

        const options = {
          title: {
            text: 'Investment Total by Funding Source',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            top: 'middle'
          },
          series: []
        }

        const series2 = {
          type: 'pie',
          radius: ['50%', '70%'],
          data: byFundingSource,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }

        options.series.push(series2)

        return options
      },
      projectsSummary() {
        const projects = this.allProjects

        const byFundingSource = _.countBy(projects, 'main_funding_source.name')
        const byFundingSourceArray = Object.keys(byFundingSource).map(key => {
          return {
            name: key,
            value: byFundingSource[key]
          }
        })

        const options = {
          title: {
            text: 'No. of Projects by Funding Source',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'right',
            top: 'middle'
          },
          series: []
        }

        const series1 = {
          type: 'pie',
          radius: ['50%', '70%'],
          data: byFundingSourceArray,
          label: {
            position: 'outer',
            alignTo: 'edge',
            margin: 20
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }

        options.series.push(series1)

        return options
      }
    },
    data: () => {
      const options = qs.parse(location.search, { ignoreQueryPrefix: true })

      return {
        allProjects: [],
        initOptions: {
          renderer: options.renderer || 'canvas'
        },
        pie: {
          title: {
            text: 'By Funding Source',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left'
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                { value: 45, name: 'undefined' },
                { value: 10, name: 'NG-Local' },
                { value: 1, name: 'NG-ODA Loan' }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
      }
    }
  }
</script>
