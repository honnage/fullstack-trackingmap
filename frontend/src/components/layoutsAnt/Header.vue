<template>
  <a-layout-header style="background: #fff; padding: 0" class="">
    <menu-unfold-outlined
      v-if="collapsed"
      class="trigger"
      @click="toggleCollapsed"
    />
    <menu-fold-outlined v-else class="trigger" @click="toggleCollapsed" />

    <span class="nav-right ">
      <span style="margin-right: 18px">
        <a-badge :count="1">
          <a-avatar style="color: #f56a00; background-color: #fde3cf">
            <template #icon><BellOutlined /></template>
          </a-avatar>
        </a-badge>
      </span>

      <span style="margin-right: 18px">
        <a-badge :count="1">
          <a-avatar style="color: #f56a00; background-color: #fde3cf">
            <template #icon><BellOutlined /></template>
          </a-avatar>
        </a-badge>
      </span>
    </span>
  </a-layout-header>
  <!-- Collapsed: {{ collapsed }} <br />
  Selected Keys: {{ selectedKeys }} -->
</template>

<script>
import { defineComponent } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined, BellOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  name: "LayoutHeader",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    BellOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
    selectedKeys: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleCollapsed() {
      this.$emit("toggle-collapsed");
    },
  },
});
</script>

<style scoped>
.trigger {
  margin-left: 20px;
  font-size: 22px;
}

.nav-right {
  position: absolute;
  right: 0px;
  margin-right: 5px;
}


</style>
