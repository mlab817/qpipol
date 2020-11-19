<template>
  <page-container>
    <template v-slot:title>
      <page-title title="Profile" icon="fas fa-id-card"></page-title>
    </template>

    <update-profile></update-profile>
  </page-container>
</template>

<script>
import PageTitle from '@/ui/page/PageTitle';
import PageContainer from '@/ui/page/PageContainer';
import UpdateProfile from '../components/profile/UpdateProfile';

export default {
  name: 'PageAccount',
  components: {
    PageContainer,
    UpdateProfile,
    PageTitle
  }
};
</script>
