<template>
  <div class="w-screen h-screen flex items-center justify-center ">
    <div class="space-y-4">
      <div class="text-6xl animate-pulse text-[#42b983]">Hello! Nuxt3 & tailwindcss & serverless</div>
      <div class="flex justify-between items-center text-2xl">
        <a
          class="underline"
          href="https://github.com/sonofmagic/serverless-nuxt3-template"
          target="_blank"
        >sonofmagic/serverless-nuxt3-template</a>
        <div class="cursor-pointer" @click="updateAuthor">by {{author}}</div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
const author = useState("author", () => "ice breaker");
//same person
const updateAuthor = () => {
  author.value = "sonofmagic";
};
</script>

<style>
</style>