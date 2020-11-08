<template>
	<div class="column">
		<q-item-label header class="q-px-none">Releases <mini-refresh @click="refetch" /></q-item-label>
		<q-card flat bordered square>
			<q-card-section>
				<q-list>
					<template v-if="$apollo.loading">
	          <q-item v-for="i in 3" :key="i">
	            <q-item-section avatar>
	              <q-skeleton type="QAvatar" />
	            </q-item-section>
	            <q-item-section>
	              <q-item-label>
	                <q-skeleton type="text" width="80%" />
	              </q-item-label>
	              <q-item-label caption>
	                <q-skeleton type="text" width="20%" />
	              </q-item-label>
	            </q-item-section>
	          </q-item>
	        </template>
	        <template v-else>
						<template v-if="latestReleases.length">
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
						</template>
						<q-item v-else>
							<q-item-section avatar>
								<q-icon name="priority_high" />
							</q-item-section>
							<q-item-section>
								<q-item-label>No release yet.</q-item-label>
							</q-item-section>
						</q-item>
					</template>
				</q-list>
			</q-card-section>
		</q-card>
	</div>
</template>

<script>
	import gql from 'graphql-tag'
	import { date } from 'quasar'
	import MiniRefresh from '../../ui/buttons/MiniRefresh'

	export default {
		components: {
			MiniRefresh
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
