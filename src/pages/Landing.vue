<template>
  <q-page>
    <div class="column">
      <div class="row items-center full-page">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div
            class="col-6 q-gutter-y-lg text-white text-center justify-center"
          >
            <div class="text-h3 text-weight-bold">
              Investment Programming &amp; <br />
              Management System
            </div>

            <div class="row">
              <div class="offset-4 col-4">
                <q-separator color="secondary" />
              </div>
            </div>

            <div class="text-h5">
              The Official Data Entry System for the DA 2017-2022 Public
              Investment Program (PIP) and the DA 2022-2024 Three Year Rolling
              Infrastructure Program (TRIP)
            </div>

            <div class="row justify-center q-gutter-md">
              <q-btn
                size="lg"
                class="text-capitalize text-weight-bolder"
                color="primary"
                style="width: 220px;"
                to="/login"
                v-if="!isLoggedIn"
              >
                Login
              </q-btn>

              <q-btn
                size="lg"
                class="text-capitalize text-weight-bolder"
                outline
                style="width: 220px;"
                type="a"
                href="https://ipms-docs.web.app/"
                target="_blank"
              >
                Learn More
              </q-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-white items-center q-py-xl">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-sm-12 text-center">
              <q-img
                src="/statics/features/responsive.png"
                width="300px"
              ></q-img>
            </div>
            <div class="col-md-6 col-sm-12 q-gutter-y-md text-center">
              <div class="text-h4">Responsive Design</div>
              <div class="text-subtitle1">
                Responsive web design is an approach to web design that makes
                web pages render well on a variety of devices and window or
                screen sizes.
              </div>
              <div>
                <q-btn
                  size="lg"
                  class="text-capitalize text-weight-bolder"
                  outline
                  color="primary"
                  style="width: 220px;"
                  type="a"
                  href="https://ipms-docs.web.app/"
                  target="_blank"
                >
                  Learn More
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-white items-center q-py-xl">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div class="row q-col-gutter-md">
            <div class="col-md-6 col-sm-12 text-center">
              <q-img
                src="/statics/docs/progressive-web-app.jpg"
                width="300px"
              ></q-img>
            </div>
            <div class="col-md-6 col-sm-12 q-gutter-y-md text-center">
              <div class="text-h4">Progressive Web Application</div>
              <div class="text-subtitle1">
                Progressive Web Apps are web applications that have been
                designed so they are capable, reliable, and installable.
              </div>
              <div>
                <q-btn
                  size="lg"
                  class="text-capitalize text-weight-bolder"
                  outline
                  color="primary"
                  style="width: 220px;"
                  type="a"
                  href="https://ipms-docs.web.app/installation"
                  target="_blank"
                >
                  Learn More
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row bg-black text-white items-center q-py-xl">
        <div
          class="offset-xl-2 col-xl-8 offset-lg-3 col-lg-6 offset-md-1 col-md-10 offset-sm-1 col-sm-10 offset-xs-0 col-xs-12"
        >
          <div class="text-center q-gutter-y-lg">
            <div class="text-h4 text-weight-bold">
              Manage your projects, better.
            </div>

            <div class="row">
              <div class="offset-4 col-4">
                <q-separator color="secondary" />
              </div>
            </div>

            <div class="text-h6">
              Ready to upgrade?
            </div>

            <q-btn
              size="lg"
              class="text-capitalize text-weight-bolder"
              outline
              color="primary"
              style="width: 220px;"
              :to="isLoggedIn ? '/dashboard' : '/login'"
            >
              Start Using IPMS
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageLanding',
  computed: {
    ...mapGetters('auth', ['isLoggedIn'])
  }
};
</script>

<style scoped>
.full-page {
  height: calc(100vh - 102px);
}
</style>
