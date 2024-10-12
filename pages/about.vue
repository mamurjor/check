<template>
  <template v-if="singleMenu">
    <template v-if="singleMenu.pageContent">
      <div v-html="singleMenu.pageContent.body_code"></div>
      <section class="py-5" id="singlepage_content">
        <div :class="'gm-' + singleMenu.pageContent.slug + '-wrapper'" v-html="singleMenu.pageContent.content"></div>
      </section>
    </template>
  </template>
</template>

<script setup>
import { useHead } from 'nuxt/app';
import { nextTick, onMounted } from 'vue';
import { useRoute, useFetch, useRequestURL } from '#imports';
import { createApp } from 'vue';
// import GmForm from '../components/from.vue';

const route = useRoute();
const pageslug = 'moving-leads';

// Fetching the data from API including header_code
// const { data: singleMenu, pending, error } = await useFetch(`https://api.doppcall.com/api/doppcall/${pageslug}`, {
//   method: 'get',
// });
const { data: singleMenu, pending, error } = await useFetch(`https://api.doppcall.com/api/doppcall/${pageslug}`, {
  method: 'get',
});

// Extracting the header_code field
const header_code = singleMenu.value?.[0]?.header_code || '';
var pageTitles = singleMenu.value && singleMenu.value.title;

// Injecting meta tags and scripts from header_code
onMounted(() => {
  injectMetaAndScripts(header_code);
  replaceShortcode(singleMenu.value);
  renderForm();
  initializeAccordions();
});

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "https://doppcall.com/laraberg.css",
    },
    {
      rel: "canonical",
      href: useRequestURL().host + '/' + pageslug,
    },
  ],
  title: pageTitles[0],
  meta: [
    { name: "robots", content: "index, follow" },
    { name: "title", content: pageTitles[0] },
    { name: "description", content: pageTitles[2] },
    { property: "og:title", content: pageTitles[0] },
    { property: "og:description", content: pageTitles[2] },
    { property: "og:image", content: pageTitles[3] },
    { property: "og:image:secure_url", content: pageTitles[3] },
    { property: "twitter:title", content: pageTitles[0] },
    { property: "twitter:description", content: pageTitles[2] },
    { property: "twitter:image", content: pageTitles[3] },
  ],
  script: [
    {
      src: "https://doppcall.com/laraberg.js",
      body: true,
    },
  ],
});

const injectMetaAndScripts = (header_code) => {
  if (!header_code) return;

  const parser = new DOMParser();
  const doc = parser.parseFromString(header_code, 'text/html');

  // Inject meta tags into the <head> section
  const metaTags = doc.querySelectorAll('meta');
  metaTags.forEach((meta) => {
    if (!document.head.querySelector(`meta[content="${meta.getAttribute('content')}"]`)) {
      document.head.appendChild(meta.cloneNode(true));
    }
  });

  // Inject script tags into the <head> section
  const scriptTags = doc.querySelectorAll('script');
  scriptTags.forEach((script) => {
    if (script.src) {
      if (!document.head.querySelector(`script[src="${script.src}"]`)) {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.type = script.type || 'text/javascript';
        newScript.async = script.async || false;
        document.head.appendChild(newScript);
      }
    } else {
      // Inline script handling, ensuring it's injected in the <head>
      const inlineScript = document.createElement('script');
      inlineScript.type = script.type || 'text/javascript';
      inlineScript.textContent = script.textContent;
      document.head.appendChild(inlineScript);
    }
  });
};



const replaceShortcode = (obj) => {
  if (obj && obj.pageContent) {
    const { content } = obj.pageContent;
    if (content) {
      obj.pageContent.content = content.replace(/\[gm-form\]/g, '<div id="gmFormContainer"></div>');
    }
  }
  return obj;
};

const renderForm = async () => {
  await nextTick();
  const container = document.getElementById('gmFormContainer');
  console.log(container);
  if (container) {
    const app = createApp(GmForm);
    app.mount(container);
  }
};

const initializeAccordions = async () => {
  await nextTick();
  const acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
};
</script>

<style>
.active, .accordion:hover {
  background-color: #012964;
  color: #fff !important;
}
</style>
