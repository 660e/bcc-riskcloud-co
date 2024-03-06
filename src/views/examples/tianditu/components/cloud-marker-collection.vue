<script lang="ts" setup>
import { onMounted } from 'vue';
import { T, TLngLat } from '@bcc/utils';
import points from '../points.json';

onMounted(() => {
  const M = new T.Map('map');
  const lnglats: TLngLat[] = points.map((point: any) => new T.LngLat(point[0], point[1]));

  M.centerAndZoom(new T.LngLat(108.95, 34.27), 6);
  M.addOverLay(new T.CloudMarkerCollection(lnglats));
});
</script>

<template>
  <div id="map"></div>
</template>
