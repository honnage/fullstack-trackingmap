<template>
  <header id="header" class="header fixed-top d-flex align-items-center">
    <div class="d-flex align-items-center justify-content-between">
      <a href="/" class="logo d-flex align-items-center">
        <img src="@/assets/img/logo.png" alt="" />
        <span class="d-none d-lg-block">Tracking</span>
      </a>
      <i class="bi bi-list toggle-sidebar" @click="toggleMenu()"></i>
    </div>

    <nav class="header-nav ms-auto">
      <ul class="d-flex align-items-center" style="padding-right: 15px;">
        <Notifications />

        <li class="nav-item dropdown pe-3" style="padding-left: 18px; ">
          <a
            class="nav-link nav-profile d-flex align-items-center pe-0"
            href="#"
            data-bs-toggle="dropdown"
          >
            <img
              src="@/assets/img/user.png"
              alt="Profile"
              class="rounded-circle"
            />
            <span class="d-none d-md-block dropdown-toggle ps-2">
              {{ userInfo.username }}
            </span>
          </a>

          <ul
            class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
          >
            <li class="dropdown-header">
              <h6>{{ userInfo.firstname }} {{ userInfo.lastname }}</h6>
            </li>

            <li>
              <a
                class="dropdown-item d-flex align-items-center"
                @click="logout()"
              >
                <i class="bi bi-box-arrow-right"></i>
                <span>Sign Out</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import Notifications from "@/components/notifications";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    Notifications,
  },
  props: {
    toggleSidebar: {
      type: Boolean,
    },
  },

  data() {
    return {
      // userInfo: null,
    };
  },

  computed: {
    userInfo() {
      const getUser = JSON.parse(localStorage.getItem("user-info"));
      let data = {
        username: getUser.username,
        firstname: getUser.firstname,
        lastname: getUser.lastname,
      };
      return data;
    },
  },

  methods: {
    toggleMenu() {
      this.$emit("toggle-menu");
    },

    logout() {
      const tokenUser = localStorage.getItem("user-token");
      console.log("logout token", tokenUser);

      axios
        .post("api/v2/logout", this.formState, {
          headers: {
            token: tokenUser, // เพิ่ม headers Authorization ที่ใช้สำหรับการรับรองตัวตน (Bearer token)
            "Content-Type": "application/json", // เพิ่ม headers Content-Type สำหรับประเภทข้อมูลที่ส่ง (ในกรณีนี้คือ JSON)
          },
        })
        .then((response) => {
          console.log("response", response);
          localStorage.removeItem("user-token");
          localStorage.removeItem("user-info");
          console.log("router push /login");
          this.$router.push("/login");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
});
</script>

<style scoped>
.header-nav .profile .dropdown-item {
  height: 38px;
}
</style>
