<template>
  <a-layout style="min-height: 100vh">
    <LayoutMenu
      :collapsed="collapsed"
      :selectedKeys="selectedKeys"
      @toggle-collapsed="toggleCollapsed"
    />

    <a-layout>
      <LayoutHeader
        :collapsed="collapsed"
        :selectedKeys="selectedKeys"
        @toggle-collapsed="toggleCollapsed"
      />

      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          collapsed {{ collapsed }} <br />
          selectedKeys {{ selectedKeys }} <br />
          Bill is a cat.
        </div>
      </a-layout-content>

      <LayoutFooter :footerText="footerText" />
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutMenu from "@/components/layoutsAnt/Menu.vue";
import LayoutHeader from "@/components/layoutsAnt/Header.vue";
import LayoutFooter from "@/components/layoutsAnt/Footer.vue";

export default {
  components: {
    LayoutMenu,
    LayoutHeader,
    LayoutFooter,
  },
  data() {
    return {
      collapsed: false,
      selectedKeys: ["1"],
      footerText: "Ant Design ©2018 Created by Ant UED",
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
