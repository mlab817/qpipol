<template>
	<div class="column">
		<q-item-label header class="q-px-none">
			Useful Links <mini-refresh @click="refetch"/>
		</q-item-label>
		<q-card flat bordered square>
			<q-card-section>
				<q-list>
					<template v-if="$apollo.loading">
	          <q-item v-for="i in 5" :key="i">
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
						<template v-if="useful_links.length">
							<q-item v-for="(link, index) in useful_links" :key="index" :to="link.to" clickable target="_blank" tag="a">
								<q-item-section avatar>
									<q-btn flat round icon="open_in_new" />
								</q-item-section>
								<q-item-section>
									<q-item-label>{{link.title}}</q-item-label>
									<q-item-label :lines="2" caption>{{link.description}}</q-item-label>
								</q-item-section>
							</q-item>
						</template>
						<q-item v-else>
							<q-item-section avatar>
								<q-icon name="priority_high" />
							</q-item-section>
							<q-item-section>
								<q-item-label>No useful links yet.</q-item-label>
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
	import MiniRefresh from '../../ui/buttons/MiniRefresh'

	export default {
		name: 'UsefulLinks',
		components: {MiniRefresh},
		apollo: {
			useful_links: {
				query: gql`
					query {
						useful_links {
							id
							title
							description
							to
						}
					}
				`
			}
		},
		data() {
			return {
				useful_links: [
					{
						title: 'PIP Guidelines',
						description: '',
						to: ''
					},
					{
						title: 'Updated Philippine Development Plan',
						description: '',
						to: ''
					},
					{
						title: 'PDP Results Matrices',
						description: '',
						to: ''
					}
				]
			}
		},
		methods: {
			refetch() {
				this.$apollo.queries.useful_links.refetch()
			}
		}
	}
</script>
