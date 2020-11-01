<template>
	<div class="column">
		<div class="row">
			<q-item-label header class="q-px-none">Releases</q-item-label>
			<q-space/>
			<refresh-button @click="refetch" />
		</div>
		<q-card flat bordered square>
			<q-card-section>
				<q-list>
					<q-item v-for="release in latestReleases" :key="release.id">
						<q-item-section avatar>
							{{release.version}}
						</q-item-section>
						<q-item-section>
							<q-item-label>{{release.summary}}</q-item-label>
							<q-item-label :lines="2" caption>{{release.change_log}}</q-item-label>
						</q-item-section>
						<q-item-section side>
							<q-item-label>
								{{release.created_at | date}}
							</q-item-label>
						</q-item-section>
					</q-item>
				</q-list>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
	import gql from 'graphql-tag'
	import { date } from 'quasar'
	import RefreshButton from '../../ui/buttons/RefreshButton'

	export default {
		components: {
			RefreshButton
		},
		name: 'ReleasesComponent',
		apollo: {
			releases: {
				query: gql`
					query {
						releases {
							id
							version
							summary
							notes
							change_log
							created_at
						}
					}
				`
			}
		},
		data() {
			return {
				releases: []
			}
		},

		methods: {
			refetch() {
				this.$apollo.queries.releases.refetch()
			}
		},

		filters: {
			date(val) {
				return date.formatDate(val, 'MMM D, YYYY')
			}
		},
		computed: {
			latestReleases() {
				const releases = this.releases

				return releases.sort((a, b) => (a.id > b.id) ? 1 : -1).slice(0,5)
			}
		}
	}
</script>
