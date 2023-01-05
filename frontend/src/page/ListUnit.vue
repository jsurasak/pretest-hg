<template>
  <div class="flex justify-center items-center w-full">
    <div class="shadow-md rounded-md px-4 w-full py-4">
      <div class="flex justify-center mb-4">
        <h4>ข้อมูลหน่วยวัด</h4>
      </div>
      <table class="table-auto border-collapse border border-slate-500 w-full">
        <thead>
          <th class="border border-slate-600">Imperial</th>
          <th class="border border-slate-600">Unit Name</th>
          <th class="border border-slate-600">Unit format</th>
          <th class="border border-slate-600">Action</th>
        </thead>
        <tbody v-for="(v, k) in itemsList" :key="k">
          <tr v-for="(v2, k2) in v.data" :key="k2">
            <td
              class="border text-center border-slate-600"
              :rowspan="v.data.length"
              v-if="k2 == 0"
            >
              {{ v.name }}
            </td>
            <td class="border text-center border-slate-700">
              {{ v2.unitname }}
            </td>
            <td class="border text-center border-slate-700">
              {{ v2.numberunit }}
            </td>
            <td class="border text-center border-slate-700">
              <router-link :to="`${v.name}/${v2.id}/edit`">
                <span class="text-sm mx-6 underline">Edit</span>
              </router-link>
              <button
                @click="delitems(v.name, v2.id)"
                class="button bg-red-400 rounded-md p-2 text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import _axios from "@/plugin/axios";
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
export default {
  setup() {
    const itemsList = ref([]);

    const getitems = async (name = "") => {
      const form = {
        typeunitname: "",
      };

      try {
        const { data } = await _axios.post("get", form);
        var obj = [];

        Object.keys(data.data).forEach((k, index) => {
          var subitems = [];

          Object.keys(data.data[k]).forEach((k2, index) => {
            subitems.push({
              id: k2,
              ...data.data[k][k2],
            });
          });

          obj.push({
            name: k,
            data: subitems,
          });

          itemsList.value = obj;
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    const delitems = (table, id) => {
      try {
        const form = {
          table: table,
          key: id,
        };

        Swal.fire({
          title: "Confirm Delete ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "confirm",
        }).then(async (result) => {
          const { data } = await _axios.post("delete", form);
          if (data.status == 200) {
            Swal.fire("Success", "delete success", "success");
            await getitems();
          }
        });
      } catch (error) {
        Swal.fire("Error", error.message, "error");
        console.error(error.message);
      }
    };

    onMounted(async () => {
      await getitems();
    });

    return {
      itemsList,
      delitems,
    };
  },
};
</script>
