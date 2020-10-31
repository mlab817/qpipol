<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card style="width: 400px; max-width: 80wh;">
      <card-header :title="title" @close="hide"></card-header>

      <q-card-section>
        <q-checkbox
          v-model="validation_data"
          :val="true"
          color="primary"
          label="Data is complete and consistent"
        />
        <q-checkbox
          v-model="validation_signed"
          :val="true"
          color="primary"
          label="Signed Copy attached and correct"
        />
        <q-input
          dense
          outlined
          label="Remarks"
          type="textarea"
          v-model="remarks"
          :rules="required"
          hint="* Required"
        />
        <q-checkbox
          v-model="agree"
          label="I understand that once the project is validated, it can no longer be edited."
        ></q-checkbox>
      </q-card-section>

      <card-footer>
        <q-btn color="green" label="Cancel" @click="hide" flat />
        <q-btn
          flat
          color="green"
          @click="onOKClick"
          :disable="!remarks || !agree"
          label="Validate"
        />
      </card-footer>
    </q-card>
  </q-dialog>
</template>

<script>
import CardHeader from '@/ui/cards/CardHeader';
import CardFooter from '@/ui/cards/CardFooter';

export default {
  components: {
    CardHeader,
    CardFooter
  },
  props: {
    title: {
      type: String
    },
    message: {
      type: String
    }
  },
  data() {
    return {
      validation_data: false,
      validation_signed: false,
      validation_endorsed: false,
      remarks: '',
      required: [val => !!val || '* Required'],
      agree: false
    };
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide');
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      const payload = {
        validation_data: this.validation_data,
        validation_signed: this.validation_signed,
        remarks: this.remarks
      };
      this.$emit('ok', payload);
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>
