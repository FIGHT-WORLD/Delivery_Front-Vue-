<template>
  <b-card no-body>
    <b-card-header class="border-0">
      <h3 class="mb-0">가게 목록</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="stores"
      @row-click="handleRowClick"
    >
      <el-table-column label="이름" min-width="200px" prop="store_name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.name
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="업종" prop="store_category" min-width="200px">
      </el-table-column>

      <el-table-column label="주소" prop="address" min-width="200px">
      </el-table-column>

      <el-table-column label="전화 번호" prop="phone_number" min-width="200px">
      </el-table-column>

      <el-table-column label="오픈 시간" prop="open_at" min-width="200px">
        <template v-slot="{ row }">
          {{ formatTime(row.open_at) }}
        </template>
      </el-table-column>

      <el-table-column label="영업 정보" prop="status" min-width="200px">
      </el-table-column>

      <el-table-column
        label="Store ID"
        prop="store_id"
        min-width="200px"
        v-if="false"
      >
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
  name: "stores-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
  },
  data() {
    return {
      stores: [], // API에서 받은 데이터 저장
      currentPage: 1,
      totalElements: 0,
      storeCategoryId: "", // 가게 카테고리 ID를 저장
    };
  },
  methods: {
    fetchStores() {
      const token = localStorage.getItem("jwtToken");
      axios
        .get("http://localhost:8080/api/v1/stores", {
          params: {
            storeCategoryId: this.storeCategoryId, // 카테고리 ID 추가
            page: this.currentPage - 1,
            size: 10,
          },
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          this.stores = response.data.data.content;
          this.totalElements = response.data.data.totalElements;
        })
        .catch((error) => {
          console.error("Error fetching stores:", error);
          alert("Failed to load stores");
        });
    },
    handleRowClick(row) {
      this.$router.push({ path: `stores/${row.store_id}` }); // storeId에 맞게 라우팅
    },
    formatTime(timeString) {
      if (timeString) {
        // "23:02:00" 형식에서 시간과 분을 추출
        let [hour, minute] = timeString.split(":");
        hour = parseInt(hour, 10);

        // AM/PM 결정
        const ampm = hour >= 12 ? "PM" : "AM";

        // 12시간 형식으로 변환
        hour = hour % 12 || 12;

        // "HH:MM AM/PM" 형식으로 반환
        return `${hour}:${minute} ${ampm}`;
      }
      return "";
    },
  },
  mounted() {
    this.fetchStores(); // 컴포넌트가 마운트될 때 데이터 가져오기
  },
};
</script>
