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
                  : '-'
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
                  : '-'
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-4">
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Total Investment Requirements
            </q-item-label>
            <q-item-label class="text-body2">
              PhP {{ project.investment_target_total | formatMoney }}
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
              Implementation Period
            </q-item-label>
            <q-item-label class="text-body2">
              {{ (project.target_start_year ? project.target_start_year : '')  + ' - ' + (project.target_end_year ? project.target_end_year : '') }}
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
                  : '-'
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
                  : '-'
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
              Added by
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
              {{ project.updater ? project.updater.name : '-' }}
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
  </q-card>
</template>

<script>
import { date } from 'quasar';
import { timeAgo, formatDate } from 'src/filters';

export default {
  name: 'KeyFacts',
  props: ['project'],
  methods: {
    timeAgo,
    formatDate
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
