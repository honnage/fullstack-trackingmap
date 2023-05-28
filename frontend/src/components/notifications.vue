<template>
  <li class="nav-item dropdown">
    <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
      <i class="bi bi-bell"></i>
      <span class="badge bg-primary badge-number">4</span>
    </a>

    <ul
      class="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications"
    >
      <li class="dropdown-header">
        You have 4 new notifications
        <a href="#"
          ><span class="badge rounded-pill bg-primary p-2 ms-2"
            >View all</span
          ></a
        >
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>

      <li class="notification-item">
        <i class="bi bi-exclamation-circle text-warning"></i>
        <div>
          <h4>Lorem Ipsum</h4>
          <p>Quae dolorem earum veritatis oditseno</p>
          <p>30 min. ago</p>
        </div>
      </li>

      <li>
        <hr class="dropdown-divider" />
      </li>

      <li>
        <hr class="dropdown-divider" />
      </li>
      <li class="dropdown-footer">
        <a href="/">Show all notifications</a>
      </li>
    </ul>
  </li>
</template>

<script>

export default {
  name: "componentsNotifications",
  components: {
  },
  //   props: {
  //     footerText: {
  //       type: Array,
  //       required: true,
  //     },
  //   },
};
</script>
