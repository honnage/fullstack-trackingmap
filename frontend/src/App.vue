<template>
  <template v-if="$route.path != '/login'">
    <body :class="toggleSidebar == true ? 'toggle-sidebar' : ''">
      <HeaderLayout
        :toggleSidebar="toggleSidebar"
        @toggle-menu="toggleCollapsed"
      />

      <MenuLayout @back-to-top="BackToTop" />

      <main id="main" class="main">
        <router-view />
      </main>

      <!-- <FooterLayout /> -->

      <!-- <button class="floating-button" @click="BackToTop">
      <i class="bi bi-arrow-up-short"></i>
    </button> -->

      <button
        v-show="showBackToTop"
        class="floating-button"
        @click="scrollToTop"
      >
        <i class="bi bi-arrow-up-short"></i>
      </button>
    </body>
  </template>

  <template v-else>
    <router-view />
  </template>
</template>

<script>
import HeaderLayout from "@/components/layouts/Header";
import MenuLayout from "@/components/layouts/Menu";
// import FooterLayout from "@/components/layouts/Footer";

export default {
  components: {
    HeaderLayout,
    MenuLayout,
    // FooterLayout,
  },
  data() {
    return {
      toggleSidebar: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.toggleSidebar = !this.toggleSidebar;
      // console.log("this.toggleSidebar", this.toggleSidebar);
    },

    BackToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log("BackToTop");
    },

    handleScroll() {
      if (window.pageYOffset > 100) {
        this.showBackToTop = true;
      } else {
        this.showBackToTop = false;
      }
    },

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
};
</script>

<style>
i {
  font-size: 26px;
  padding: 16px;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
  transition: background-color 0.3s ease;
}

.floating-button:hover {
  background-color: #0056b3;
}

.conten-custom {
  margin-top: 60px;
  margin-bottom: auto;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
