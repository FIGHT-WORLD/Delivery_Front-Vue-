<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">Orders Table</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="orders"
    >
      <el-table-column label="Store Name" min-width="200px" prop="store_name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.store_name
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Menu Name" prop="menu_name" min-width="200px">
      </el-table-column>

      <el-table-column label="Created At" prop="createdAt" min-width="200px">
        <template v-slot="{ row }">
          <span>{{ new Date(row.createdAt).toLocaleString() }}</span>
        </template>
      </el-table-column>
    </el-table>

    <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="10"
        :total="totalElements"
      ></base-pagination>
    </b-card-footer>
  </b-card>
</template>

<script>
import axios from "axios";
import { Table, TableColumn } from "element-ui";

export default {
  name: "orders-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      orders: [], // API에서 받은 데이터 저장
      currentPage: 1,
      totalElements: 0,
    };
  },
  methods: {
    fetchOrders() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8080/api/v1/orders", {
          params: {
            page: this.currentPage - 1,
            size: 10,
            sortBy: "createdAt",
            direction: "desc",
          },
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.orders = response.data.data.content;
          this.totalElements = response.data.data.totalElements;
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          alert("Failed to load orders");
        });
    },
  },
  mounted() {
    this.fetchOrders(); // 컴포넌트가 마운트될 때 데이터 가져오기
  },
};
</script>
