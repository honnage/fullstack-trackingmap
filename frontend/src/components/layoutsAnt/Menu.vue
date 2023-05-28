<!-- eslint-disable vue/no-mutating-props -->
<template>
  <a-layout-sider v-model:collapsed="collapsed" theme="dark" >
    <!-- dark or light -->
    <div class="title-menu">Tracking</div>
    <!-- <a-button block @click="toggleCollapse">X</a-button> -->
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-menu-item key="1">
        <template #icon>
          <PieChartOutlined />
        </template>
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <template #icon>
          <DesktopOutlined />
        </template>
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <template #icon>
          <InboxOutlined />
        </template>
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <template #icon>
          <MailOutlined />
        </template>
        <template #title>Navigation One</template>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #icon>
          <AppstoreOutlined />
        </template>
        <template #title>Navigation Two</template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>

    <!-- collapsed {{ collapsed }} <br/>
    selectedKeys {{ selectedKeys }} -->
  </a-layout-sider>
</template>

<script>
import { defineComponent } from "vue";

import {
  PieChartOutlined,
  DesktopOutlined,
  InboxOutlined,
  MailOutlined,
  AppstoreOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  name: "LayoutMenu",
  components: {
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined,
    MailOutlined,
    AppstoreOutlined,
  },
  props: {
    collapsed: Boolean, // รับค่า collapsed จาก component หลัก
    selectedKeys: Array,
  },
  setup() {
    return {};
  },
});
</script>
<style scoped>
.title-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
}
</style>
