<template>
  <aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">

      <li class="nav-item" v-for="route in routes" :key="route.path">
        <a :class="$route.path == route.path ? 'nav-link': 'nav-link collapsed'" :href="route.path">
          <i :class="route.icon"></i>
          <span>{{ route.name }}</span>
          <!-- <i class="bi bi-chevron-down ms-auto"></i> -->
        </a>

        <!-- <a
          class="nav-link collapsed"
          data-bs-target="#components-nav"
          data-bs-toggle="collapse"
          href="#"
        >
          <i class="bi bi-menu-button-wide"></i><span>Components</span
          ><i class="bi bi-chevron-down ms-auto"></i>
        </a>
        <ul
          id="components-nav"
          class="nav-content collapse"
          data-bs-parent="#sidebar-nav"
        >
          <li>
            <a href="components-alerts.html">
              <i class="bi bi-circle"></i><span>Alerts</span>
            </a>
          </li>
        </ul> -->
      </li>

    </ul>
  </aside>
</template>

<script>
import { defineComponent } from "vue";
import router from "@/router";

export default defineComponent({
  name: "LayoutMenu",
  //   props: {
  //     toggleSidebar: {
  //       type: Boolean,
  //     },
  //   },
  data() {
    return {
      routes: [],
    };
  },

  mounted() {
    console.log("router", router.options.routes);
    this.routes = router.options.routes.filter(
      (route) => route.meta?.auth === true
    );
    console.log("this.routes length", this.routes.length);

  },

  methods: {
    BackToTop() {
      this.$emit("back-to-top");
    },
  },
});
</script>

<style scoped>
.sidebar-nav .nav-link {
  height: 40px;
}

.sidebar-nav .nav-content a {
  height: 40px;
}
</style>
