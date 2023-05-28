<template>
  <div class="conten-custom">
    <!-- <h1>TransactionsPage</h1> -->
    <nav>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Home</a></li>
        <li class="breadcrumb-item active">Transactions</li>
      </ol>
    </nav>

    <a-card class="gutter-box" style="width: 100">
      <a-form class="form">
        <a-row :gutter="24">
          <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
            <a-form-item name="username" :xl="8" :lg="12" :md="12" :sm="24">
              <label for="username" class="label"> Device Number </label>
              <a-input v-model="username" />
            </a-form-item>
          </a-col>

          <a-col :xl="6" :lg="8" :md="8" :sm="24" :xs="24">
            <a-form-item name="username">
              <label for="username" class="label"> Selete Datetime </label>
              <a-range-picker
                v-model:value="value2"
                :ranges="ranges"
                show-time
                format="YYYY/MM/DD HH:mm:ss"
              />
            </a-form-item>
          </a-col>

          <a-col :xl="2" :lg="4" :md="4" :sm="24" :xs="24">
            <br />
            <a-button type="primary" style="width: 100%">Submit </a-button>
          </a-col>
        </a-row>
      </a-form>
      <br/>

      <a-table
        :scroll="{ x: true }"
        :columns="columns"
        :row-key="(record) => record.login.uuid"
        :data-source="dataSource"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'name'"
            >{{ text.first }} {{ text.last }}</template
          >
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { usePagination } from "vue-request";
import { computed, defineComponent, ref } from "vue";
import axios from "axios";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    filters: [
      {
        text: "Male",
        value: "male",
      },
      {
        text: "Female",
        value: "female",
      },
    ],
    width: "20%",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
];
const queryData = (params) => {
  return axios.get("https://randomuser.me/api?noinfo", {
    params,
  });
};

export default defineComponent({
  name: "TransactionsPage",
  setup() {
    const {
      data: dataSource,
      run,
      loading,
      current,
      pageSize,
    } = usePagination(queryData, {
      formatResult: (res) => res.data.results,
      pagination: {
        currentKey: "page",
        pageSizeKey: "results",
      },
    });
    const pagination = computed(() => ({
      total: 200,
      current: current.value,
      pageSize: pageSize.value,
    }));
    const handleTableChange = (pag, filters, sorter) => {
      run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    };
    return {
      dataSource,
      pagination,
      loading,
      columns,
      handleTableChange,
      value1: ref(),
      value2: ref(),
      ranges: {
        Today: [dayjs(), dayjs()],
        "This Month": [dayjs(), dayjs().endOf("month")],
      },
    };
  },
});
</script>
