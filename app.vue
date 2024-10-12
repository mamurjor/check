<template>
  <NuxtLayout>
    <Head>
      <title>NUXT CRUD APP</title>
    </Head>
    <NuxtPage />
  </NuxtLayout>
</template>



<script>
export default {
  data() {
    return {
      customHeadContent: '' // এখানে HTML কন্টেন্ট সংরক্ষণ করা হবে
    };
  },
  async mounted() {
    // ব্যাকএন্ড থেকে ডাইনামিক HTML কন্টেন্ট ফেচ করা
    try {
      const response = await fetch('/api/get-html-content');
      const result = await response.json();

      // এখানে সরাসরি ফেচ করা HTML/Script কন্টেন্ট সেট করা হবে
      this.customHeadContent = `"<meta name='test'></meta>"`;
    } catch (error) {
      console.error('Error fetching content:', error);
    }
  },
  head() {
    return {
      script: [
        {
          hid: 'dynamicContent',
          innerHTML: this.customHeadContent, // সরাসরি HTML কন্টেন্ট ইনজেক্ট করা
          type: 'text/javascript'
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        'dynamicContent': ['innerHTML']
      }
    };
  }
}
</script>
