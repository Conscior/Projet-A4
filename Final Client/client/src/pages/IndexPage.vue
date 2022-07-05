<template>
  <q-page class="q-pa-md">
    <!-- #1 Row -->
    <div class="row justify-around q-gutter-md q-pb-md">
      <div class="column col-5 text-center">
        <div class="col-8">
          <h3>Trusted Quality</h3>
          <p>We strive to deliver an impecable service</p>
        </div>
        <div class="row no-wrap justify-around col-2 q-gutter-sm">
          <q-btn
            class="col-4"
            color="primary"
            outline
            rounded
            label="Learn more"
          />
          <q-btn
            class="col-4"
            color="primary"
            outline
            rounded
            label="Explore"
            icon-right="navigate_next"
          />
        </div>
      </div>
      <div class="col-5">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          autoplay
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
        >
          <q-carousel-slide
            style="border-radius: 15px"
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            style="border-radius: 15px"
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
          <q-carousel-slide
            style="border-radius: 15px"
            :name="1"
            img-src="https://cdn.quasar.dev/img/mountains.jpg"
          />
        </q-carousel>
      </div>
    </div>

    <!-- #2 Row -->
    <div class="row justify-around q-gutter-md">
      <div class="col-5">
        <q-card class="my-card">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" loading="lazy">
            <div class="absolute-full text-subtitle2 flex flex-center">
              <p>Top Picks</p>
            </div>
          </q-img>
        </q-card>
      </div>
      <div class="col-5">
        <q-card class="my-card">
          <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
            <div class="absolute-full text-subtitle2 flex flex-center">
              New Arrivals
            </div>
          </q-img>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "IndexPage",
  setup() {
    return {
      slide: ref(1),
    };
  },
});
</script>
