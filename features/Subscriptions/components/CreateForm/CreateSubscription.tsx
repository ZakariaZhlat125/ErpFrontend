"use client";

import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useSubscriptionsForm } from "../../hooks/useSubscriptionsForm";
import { BILLING_CYCLE_OPTIONS, PAYMENT_METHOD_OPTIONS } from "../../constants/subscriptions.constants";
import { useTranslations } from "next-intl";

interface CreateSubscriptionProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateSubscription({ isOpen, onClose, onSuccess }: CreateSubscriptionProps) {
  const t = useTranslations("subscriptions");
  
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = useSubscriptionsForm("create", undefined, handleSuccess);

  const billingOptions = BILLING_CYCLE_OPTIONS.map((o) => ({ value: o.value, label: t(`billingCycle.${o.value}`) }));
  const paymentOptions = [
    { value: '', label: t('form.selectPaymentMethod') },
    ...PAYMENT_METHOD_OPTIONS.map((o) => ({ value: o.value, label: t(`paymentMethod.${o.value}`) })),
  ];

  const footer = (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        htmlType="submit"
        variant="primary"
        isLoading={isPending}
        disabled={isPending}
        onClick={handleSubmit}
      >
        {t("submit")}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("modalTitle")}
      size="md"
      footer={null}
    >
    <FormContainer
      title=""
      onSubmit={handleSubmit}
      footer={footer}
    >
      <div className="grid grid-cols-1 gap-4">
        <RHFInput
          methods={form}
          name="organization_id"
          label={t("form.organizationId")}
          placeholder={t("form.organizationIdPlaceholder")}
        />

        <RHFInput
          methods={form}
          name="plan_id"
          label={t("form.planId")}
          placeholder={t("form.planIdPlaceholder")}
        />

        <RHFSelect
          methods={form}
          name="billing_cycle"
          label={t("form.billingCycle")}
          options={billingOptions}
        />

        <RHFSelect
          methods={form}
          name="payment_method"
          label={t("form.paymentMethod")}
          options={paymentOptions}
        />

        <RHFSwitch
          methods={form}
          name="auto_renew"
          label={t("form.autoRenew")}
        />
      </div>
    </FormContainer>
    </Modal>
  );
}
