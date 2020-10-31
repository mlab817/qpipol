<template>
  <q-uploader
    :factory="factoryFn"
    multiple
    style="max-width: 300px"
    ref="uploader"
    label="Upload Signed Copy"
    @finish="$emit('close')"
  />
</template>

<script>
export default {
  name: 'UploadSigned',
  props: ['id'],
  methods: {
    factoryFn() {
      // returning a Promise
      const file = this.$refs.uploader.files[0];

      const payload = {
        id: this.$props.id,
        signed_copy: file,
        remarks: 'Uploaded signed copy'
      };

      return new Promise((resolve, reject) => {
        try {
          resolve(this.$store.dispatch('projects/uploadSignedCopy', payload));
        } catch (err) {
          reject(err);
        }
      });
    }
  }
};
</script>
