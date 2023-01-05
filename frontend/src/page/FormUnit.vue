<template>
  <div class="flex justify-center items-center w-full">
    <form class="shadow-md rounded-md px-4 py-4">
      <div class="flex justify-center mb-4">
        <h4>ฟอร์มข้อมูลหน่วยวัด</h4>
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
        >
          <option :value="{}">--Select items--</option>
          <option v-for="(v, k) in typeunitdata" :key="k" :value="v">
            {{ v.name }}
          </option>
        </select>
      </div>
      <div class="mb-3 flex items-center">
        <div class="flex-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="nameunit"
            >หน่วยตั้งต้น</label
          >
        </div>
        <div class="flex-initial block mx-4"></div>
        <div class="flex-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 pl-8"
            for="nameunit"
            >จำนวนที่ถูกแปลง</label
          >
        </div>

        <div class="flex-1">
          <label
            class="block text-gray-700 text-sm font-bold mb-2 pl-6"
            for="nameunit"
            >ตัวคำนวน</label
          >
        </div>
      </div>
      <div class="mb-3 flex items-center">
        <div class="flex-1 block text-gray-700 text-sm font-bold mx-4">
          {{ selectdata.defalutunit && `1 ${selectdata.defalutunit}` }}
        </div>
        <div class="flex-initial block mx-4">=</div>
        <div class="flex-1 px-3">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unit"
            type="text"
            v-model="numberunit"
            placeholder="จำนวน"
          />
        </div>
        <div class="flex-1 px-3">
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nameunit"
            type="text"
            v-model="unitname"
            placeholder="ชื่อหน่วย"
          />
        </div>
      </div>
      <div class="flex justify-end items-center">
        <button
          class="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="button"
          @click="submitform"
        >
          บันทึก
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useMainStore } from "@/store";
import _axios from "@/plugin/axios";
import Swal from "sweetalert2";
import { useRouter, useRoute } from "vue-router";

export default {
  setup() {
    const typeForm = ref("add");
    const store = useMainStore();
    const route = useRoute();
    const routes = useRouter();

    const selectdata = ref({});
    const numberunit = ref(0);
    const unitname = ref("");

    const typeunitdata = store.typeunitShow;

    const checkunitname = async () => {
      const form = {
        typeunitname: selectdata.value.name,
      };

      const { data } = await _axios.post("get", form);

      if (data.status == 200) {
        const items = data.data;
        var check = true;

        Object.keys(items).forEach((k, index) => {
          check = items[k].unitname == unitname.value ? false : true;
        });

        return check;
      } else {
        return true;
      }
    };

    const submitform = async () => {
      if (typeForm.value == "add") {
        await addform();
      } else {
        await editform();
      }
    };

    const addform = async () => {
      const form = {
        typeunitname: selectdata.value.name,
        data: {
          numberunit: numberunit.value,
          unitname: unitname.value,
        },
      };

      try {
        const check = await checkunitname();

        if (check) {
          const { data } = await _axios.post("add", form);

          if (data.status == 200) {
            Swal.fire("Success", "save success", "success");
            numberunit.value = "";
            unitname.value = "";
          } else {
            Swal.fire("Warning", data.data.message, "warning");
          }
        } else {
          Swal.fire("Warning", "unitname must not be duplicated", "warning");
          unitname.value = "";
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    const editform = async () => {
      try {
        const form = {
          typeunitname: selectdata.value.name,
          id: route.params.id,
          data: {
            numberunit: numberunit.value,
            unitname: unitname.value,
          },
        };

        const { data } = await _axios.post("edit", form);

        if (data.status == 200) {
          Swal.fire("Success", "update success", "success");
          selectdata.value = [];
          numberunit.value = "";
          unitname.value = "";
          routes.push("/list");
        } else {
          Swal.fire("Warning", data.data.message, "warning");
        }
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    };

    const getData = async (type, id) => {
      const form = {
        typeunitname: type,
        id: id,
      };

      try {
        const { data } = await _axios.post("get", form);

        selectdata.value = typeunitdata.find((e) => e.name == type);
        numberunit.value = data.data.numberunit;
        unitname.value = data.data.unitname;
      } catch (error) {
        console.error(error.message);
      }
    };

    onMounted(async () => {
      selectdata.value = [];
      numberunit.value = "";
      unitname.value = "";
      if (route.params.typeform == "edit") {
        await getData(route.params.type, route.params.id);
        typeForm.value = "edit";
      } else {
        typeForm.value = "add";
      }
    });

    return {
      selectdata,
      numberunit,
      unitname,
      typeunitdata,
      submitform,
      typeForm,
    };
  },
};
</script>
