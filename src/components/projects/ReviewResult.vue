<template>
  <q-card square flat bordered class="q-ma-sm">
    <q-card-section>
      <div class="text-h6">Review</div>
    </q-card-section>
    <q-list>
      <q-item-label header class="text-primary text-uppercase"
        >Responsiveness</q-item-label
      >
      <q-item>
        <q-item-section>
          <q-item-label>PDP Chapters</q-item-label>
        </q-item-section>
        <q-item-section>
          <template v-if="review.pdp_chapters.length">
            <q-item-label>
              <q-chip
                square
                class="glossy"
                v-for="{ id, name } in review.pdp_chapters"
                :key="id"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                <q-avatar text-color="black">{{ id }}</q-avatar>
                {{ name }}
              </q-chip>
            </q-item-label>
          </template>
          <template v-else>
            <q-item-label class="text-negative">None selected</q-item-label>
          </template>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>PDP Indicators</q-item-label>
        </q-item-section>
        <q-item-section>
          <template v-if="review.pdp_indicators.length">
            <q-item-label>
              <q-chip
                class="glossy"
                v-for="{ id, name } in review.pdp_indicators"
                :key="id"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                <q-avatar text-color="black">{{ id }}</q-avatar>
                {{ name }}
              </q-chip>
            </q-item-label>
          </template>
          <template v-else>
            <q-item-label class="text-negative">None selected</q-item-label>
          </template>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>Sustainable Development Goals</q-item-label>
        </q-item-section>
        <q-item-section>
          <template v-if="review.sustainable_development_goals.length">
            <q-item-label class="row">
              <q-chip
                square
                v-for="{ id, name } in review.sustainable_development_goals"
                :key="id"
                class="glossy"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                <q-avatar text-color="black">{{ id }}</q-avatar>
                {{ name }}
              </q-chip>
            </q-item-label>
          </template>
          <template v-else>
            <q-item-label class="text-negative">None selected</q-item-label>
          </template>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>Ten Point Agenda</q-item-label>
        </q-item-section>
        <q-item-section>
          <template v-if="review.ten_point_agenda.length">
            <q-item-label class="row">
              <q-chip
                square
                v-for="{ id, name } in review.ten_point_agenda"
                :key="id"
                class="glossy"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                <q-avatar text-color="black">{{ id }}</q-avatar>
                {{ name }}
              </q-chip>
            </q-item-label>
          </template>
          <template v-else>
            <q-item-label class="text-negative">None selected</q-item-label>
          </template>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>Implementation Basis</q-item-label>
        </q-item-section>
        <q-item-section>
          <template v-if="review.bases.length">
            <q-item-label class="row">
              <q-chip
                square
                v-for="{ id, name } in review.bases"
                :key="id"
                class="glossy"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                <q-avatar text-color="black">{{ id }}</q-avatar>
                {{ name }}
              </q-chip>
            </q-item-label>
          </template>
          <template v-else>
            <q-item-label class="text-negative">None selected</q-item-label>
          </template>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>8 Paradigms in Agriculture</q-item-label>
        </q-item-section>
        <q-item-section>
          <template v-if="review.paradigms.length">
            <q-item-label class="row">
              <q-chip
                square
                v-for="{ id, name } in review.paradigms"
                :key="id"
                class="glossy"
                color="orange"
                text-color="white"
                icon-right="star"
              >
                <q-avatar text-color="black">{{ id }}</q-avatar>
                {{ name }}
              </q-chip>
            </q-item-label>
          </template>
          <template v-else>
            <q-item-label class="text-negative">None selected</q-item-label>
          </template>
        </q-item-section>
      </q-item>

      <q-item-label header class="text-primary text-uppercase"
        >Readiness</q-item-label
      >

      <q-item>
        <q-item-section>
          <q-item-label>To begin implementation within 2017-2022 </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ review.within_period ? 'Yes' : 'No' }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>Readiness</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            review.readiness ? review.readiness.name : ''
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="text-primary text-uppercase">
        Typology
      </q-item-label>

      <q-item>
        <q-item-section>
          <q-item-label>Public Investment Program</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ review.pip ? 'Yes' : 'No' }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>Core Investment Program/Project</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ review.cip ? 'Yes' : 'No' }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>CIP Type</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{
            review.cip_type ? review.cip_type.name : 'N/A'
          }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label
            >Three Year Rolling Infrastructure Program (TRIP)</q-item-label
          >
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ review.trip ? 'Yes' : 'No' }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item-label header class="text-primary text-uppercase">
        Other Information
      </q-item-label>

      <q-item>
        <q-item-section>
          <q-item-label>
            Remarks
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ review.remarks }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-item-label>
            Reviewed by
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ review.reviewer.name }}
          </q-item-label>
          <q-item-label caption>
            {{ review.updated_at }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script>
export default {
  name: 'ReviewResult',
  props: ['review']
};
</script>
