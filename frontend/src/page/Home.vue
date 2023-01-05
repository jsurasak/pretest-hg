<template>
  <div class="flex justify-center items-center w-full">
    <div class="shadow-md rounded-md px-4 w-full py-4">
      <div class="flex justify-center mb-4">
        <h4>ฟอร์มแปลงหน่วย</h4>
      </div>
      <div class="mb-3 flex items-center">
        <div class="w-1/3">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="typeunit"
            >ประเภทหน่วย</label
          >
        </div>
        <select
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="typeunit"
          placeholder="typeunit"
          v-model="selectdata"
          @change="getunit"
        >
          <option :value="{}">--Select items--</option>
          <option v-for="(v, k) in typeunitdata" :key="k" :value="v">
            {{ v.name }}
          </option>
        </select>
      </div>
      <div class="mt-10 flex items-center">
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 px-3"
            >หน่วยตั้งต้น</label
          >
        </div>
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 px-3"
            >จำนวน</label
          >
        </div>
        <div class="flex-initial block mx-6"></div>
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 px-3"
            >เปลียน unit</label
          >
        </div>
        <div class="flex-initial block mx-6"></div>
        <div class="flex-1">
          <label class="block text-gray-700 text-sm font-bold mb-2 px-3"
            >convert unit</label
          >
        </div>
      </div>
      <div class="mb-3 flex items-center">
        <div class="flex-1 px-3">
          {{ selectdata.defalutunit }}
        </div>
        <div class="flex-1 px-3">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unit"
            type="text"
            v-model="countunitconvert"
            placeholder="จำนวน"
          />
        </div>
        <div class="flex-initial block mx-4">=></div>
        <div class="flex-1 px-3">
          <select
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="selectunitconvert"
          >
            <option :value="{}">--Select items--</option>
            <option v-for="(v, k) in items" :key="k" :value="v">
              {{ v.unitname }}
            </option>
          </select>
        </div>
        <div class="flex-initial block mx-6">=</div>
        <div class="flex-1 px-3">{{ convertData }}</div>
      </div>
      <div class="flex justify-end items-center">
        <button
          class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="buttom"
          @click="convertEvent"
        >
          convert
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMainStore } from "@/store";
import _axios from "@/plugin/axios";
import Swal from "sweetalert2";
export default {
  setup() {
    const store = useMainStore();

    const selectdata = ref({});
    const convertData = ref(0);
    const countunitconvert = ref(0);
    const selectunitconvert = ref({});
    const typeunitdata = store.typeunitShow;

    const items = ref([]);

    const getunit = async () => {
      try {
        const form = {
          typeunitname: selectdata.value.name,
        };

        const { data } = await _axios.post("get", form);
        if (data.status == 200) {
          Object.keys(data.data).forEach((k, index) => {
            items.value.push(data.data[k]);
          });
          selectunitconvert.value = {};
        } else {
          items.value = [];
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const convertEvent = () => {
      if (selectunitconvert.value.numberunit) {
        var data = selectunitconvert.value.numberunit * countunitconvert.value;
      } else {
        Swal.fire("Warning", "please select unit convert", "warning");
      }

      convertData.value = data;
    };

    return {
      selectdata,
      typeunitdata,
      items,
      convertData,
      countunitconvert,
      selectunitconvert,
      convertEvent,
      getunit,
    };
  },
};
</script>
