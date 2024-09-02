<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="
      $route.meta.navbarClasses
        ? $route.meta.navbarClasses
        : 'bg-success navbar-dark'
    "
    type=""
  >
    <!-- Navbar content... -->
    <b-navbar-nav class="align-items-center ml-auto ml-md-0">
      <b-nav-item-dropdown right>
        <b-dropdown-item class="pr-0" href="#">
          <b-media no-body class="align-items-center">
            <span class="avatar avatar-sm">
              <b-img
                alt="Image placeholder"
                rounded="circle"
                src="/img/theme/admin.png"
              />
            </span>
            <b-media-body class="ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{ username }}</span>
            </b-media-body>
          </b-media>
        </b-dropdown-item>
        <b-dropdown>
          <!-- Dropdown items... -->
        </b-dropdown>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </base-nav>
</template>

<script>
import BaseNav from "@/components/BaseNav.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {
    BaseNav,
    Modal,
  },
  data() {
    return {
      username: "", // username을 저장할 변수
    };
  },
  mounted() {
    // 컴포넌트가 마운트될 때 localStorage에서 username을 가져옴
    this.username = localStorage.getItem("username") || "관리자"; // 기본값 설정 가능
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
  },
};
</script>

<style scoped>
.top-navbar {
  top: 0px;
}
</style>
