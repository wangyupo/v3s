<template>
  <div class="home w-full h-full grid grid-cols-12 gap-3">
    <div class="col-span-3 bg-[skyblue]"></div>
    <div class="col-span-6 grid grid-rows-12 gap-y-3">
      <div class="row-span-8 w-full bg-[red]">
        <RhWrapper title="设备监测" class="w-full h-full" media>
          <RhChartLB :option="option"></RhChartLB>
        </RhWrapper>
      </div>
      <div class="row-span-4 bg-slate-500"></div>
    </div>
    <div class="col-span-3 bg-[orange]"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import RhChartLB from "@/components/RhChartLB.vue";

const option = ref({});

onMounted(() => {
  fn_api();
});

const fn_api = () => {
  const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const seriesData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  option.value = {
    xAxis: { data: categories },
    series: [{ name: "Count", type: "bar", data: seriesData }],
  };
};
</script>

<style lang="scss" scoped></style>
