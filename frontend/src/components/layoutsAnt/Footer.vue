<template>
  <a-layout-footer style="text-align: center">
    {{ footerText }}
  </a-layout-footer>
</template>

<script>
export default {
  name: "LayoutFooter",
  components: {},
  props: {
    footerText: {
      type: Array,
      required: true,
    },
  },
};
</script>
