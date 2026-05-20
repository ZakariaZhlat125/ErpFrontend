"use client";

import { useEffect } from "react";
import { FormContainer } from "@/components/forms/FormContainer";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useSubscriptionsForm } from "../../hooks/useSubscriptionsForm";
import { BILLING_CYCLE_OPTIONS, PAYMENT_METHOD_OPTIONS } from "../../constants/subscriptions.constants";
import { Subscription } from "../../types/subscriptions.types";
import { useTranslations } from "next-intl";

interface EditSubscriptionProps {
  subscription: Subscription | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditSubscription({ subscription, isOpen, onClose, onSuccess }: EditSubscriptionProps) {
  const t = useTranslations("subscriptions");
  
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = useSubscriptionsForm("edit", subscription ?? undefined, handleSuccess);

  useEffect(() => {
    if (subscription) {
      form.reset({
        plan_id: subscription.plan_id,
        billing_cycle: subscription.billing_cycle,
        auto_renew: subscription.auto_renew,
        payment_method: subscription.payment_method || '',
      });
    }
  }, [subscription, form]);

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
        {t("save")}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("editModalTitle")}
      size="md"
      footer={null}
    >
    <FormContainer
      title=""
      onSubmit={handleSubmit}
      footer={footer}
    >
      <div className="grid grid-cols-1 gap-4">
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
