<template>
	<div class="column">
		<q-item-label header class="q-px-none">Announcements <mini-refresh @click="refetch" /></q-item-label>
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
						<template v-if="announcements.length">
							<q-item v-for="an in latestAnnouncements" :key="an.id">
								<q-item-section>
									<q-item-label>{{an.subject}}</q-item-label>
									<q-item-label :lines="2" caption>{{an.message}}</q-item-label>
								</q-item-section>
								<q-item-section side>
									<q-item-label>
										{{ an.created_at | timeDiff }}
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
	import { timeDiff } from '../../filters'
	import { FETCH_ANNOUNCEMENTS } from '@/graphql'
	import { MiniRefresh } from '@/ui'

	export default {
		components: { MiniRefresh },
		name: 'AnnouncementComponent',
		apollo: {
			announcements: {
				query: FETCH_ANNOUNCEMENTS
			}
		},
		data() {
			return {
				announcements: []
			}
		},
		computed: {
			latestAnnouncements() {
				const announcements = this.announcements

				return announcements.sort((a, b) => (a.id > b.id) ? 1 : -1).slice(0,5)
			}
		},
		methods: {
			refetch() {
				this.$apollo.queries.announcements.refetch()
			}
		},
		filters: {
			timeDiff
		}
	}
</script>
