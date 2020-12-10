<template>
  <q-card
    class="column q-mb-sm"
    :class="dark ? '' : 'bg-fao'"
    :dark="dark"
    tag="div"
    bordered
    flat
    square
  >
    <q-item-label header class="text-uppercase text-subtitle1"
      >Key Facts</q-item-label
    >
		<div class="row q-pa-md text-h6">
			{{project.title}}
		</div>
    <div class="row">
      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Implementation Agency
            </q-item-label>
            <q-item-label class="text-body2">
              {{
                project.operating_unit
                  ? project.operating_unit.name
                  : 'Not specified'
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Fund Source
            </q-item-label>
            <q-item-label class="text-body2">
              {{
                project.main_funding_source
                  ? project.main_funding_source.name
                  : 'Not specified'
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Total Project Cost (in PhP)
            </q-item-label>
            <q-item-label class="text-body2">
              {{ project.investment_target_total | formatMoney }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Duration
            </q-item-label>
            <q-item-label class="text-body2">
              {{ project.target_start_year + ' - ' + project.target_end_year }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Spatial Coverage
            </q-item-label>
            <q-item-label class="text-body2">
              {{
                project.spatial_coverage
                  ? project.spatial_coverage.name
                  : 'Not specified'
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Project Status
            </q-item-label>
            <q-item-label class="text-body2">
              {{
                project.project_status
                  ? project.project_status.name
                  : 'Not specified'
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>

    <div class="row">
      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Added by <mini-help @click="showAddedByInfo" />
            </q-item-label>
            <q-item-label class="text-body2">
              {{ project.creator ? project.creator.name : '' }}
            </q-item-label>
            <q-item-label caption>
              {{ project.created_at | formatDateTime }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Last Updated
            </q-item-label>
            <q-item-label class="text-body2">
              {{ project.updater ? project.updater.name : '' }}
            </q-item-label>
            <q-item-label caption>
              {{ project.updated_at | formatDateTime }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

			<div class="col-4">
				<q-item>
					<q-item-section>
						<q-item-label caption>
							Submission Status
						</q-item-label>
						<q-item-label class="text-body2">
							<q-badge>
								{{
								project.submission_status
								? project.submission_status.name
								: ''
								}}
							</q-badge>
						</q-item-label>
					</q-item-section>
				</q-item>
			</div>
    </div>

    <q-dialog v-model="history">
      <q-card square style="min-width:360px">
        <card-header title="History" @close="history = false"></card-header>
        <q-card-section class="q-pa-none">
          <template v-if="project.project_processing_statuses && project.project_processing_statuses.length">
            <q-markup-table class="col" flat wrap-cells bordered square>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Processed by</th>
                  <th>Processed on</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="pps in project.project_processing_statuses"
                  :key="pps.id"
                >
                  <td class="text-uppercase">
                    {{ pps.processing_status.name }}
                  </td>
                  <td>{{ pps.processor ? pps.processor.name : '' }}</td>
                  <td>{{ pps.processed_at | formatDate }}</td>
                  <td>{{ pps.remarks }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </template>
          <template v-else>
            No information available.
          </template>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
import { date } from 'quasar';
import CardHeader from '@/ui/cards/CardHeader';
import { timeAgo, formatDate } from '@/filters';
import MiniHelp from '../../../ui/buttons/MiniHelp'

export default {
  components: {MiniHelp, CardHeader },
  name: 'KeyFacts',
  props: ['project'],
  computed: {
    dark() {
      return this.$store.state.settings.dark;
    }
  },
  data() {
    return {
      history: false
    };
  },
  methods: {
    timeAgo,
    formatDate,
	  showAddedByInfo() {
    	this.$q.dialog({
				title: 'Help',
				message: 'Only the user who <strong>added</strong> the project can edit it and the reviewer assigned to the operating unit.',
				html: true,
				cancel: true
			})
		}
  },
  filters: {
    formatDate(val) {
      return timeAgo(val);
    },
    formatDateTime(val) {
      if (!val) {
        return '';
      }
      return date.formatDate(val, 'MMM DD YYYY HH:mm:ss A');
    },
    formatMoney(val) {
      if (val) {
        return val.toLocaleString('en-GB', { maximumFractionDigits: 2 });
      }
      return 0.0;
    }
  }
};
</script>
