<template>
  <div
    class="container mx-auto px-4 flex flex-col h-full justify-center items-center"
  >
    <div class="flex flex-initial">
      <ul class="flex">
        <router-link tag="li" class="mx-2 underline text-sm" to="/"
          >Conversion unit</router-link
        >
        <span class="mx-2">/</span>
        <router-link tag="li" class="mx-2 underline text-sm" to="/list"
          >List Unit</router-link
        >
        <span class="mx-2">/</span>
        <router-link tag="li" class="mx-2 underline text-sm" to="/add"
          >Form Add Unit</router-link
        >
      </ul>
    </div>
    <router-view />
  </div>
</template>
<script setup></script>
