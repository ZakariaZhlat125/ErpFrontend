"use client";

import { useTranslations } from "next-intl";
import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFTextArea } from "@/components/forms/RHFTextArea";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { usePlansForm } from "../../hooks/usePlansForm";
import { BILLING_CYCLE_OPTIONS } from "../../constants/plans.constants";

interface CreatePlanProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreatePlan({ isOpen, onClose, onSuccess }: CreatePlanProps) {
  const t = useTranslations("plans");
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = usePlansForm("create", undefined, handleSuccess);

  const billingOptions = BILLING_CYCLE_OPTIONS.map((o) => ({ 
    value: o.value, 
    label: t(`billingCycle.${o.value}`) 
  }));

  const footer = (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        htmlType="submit"
        variant="primary"
        isLoading={isPending}
        disabled={isPending}
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <RHFInput
            methods={form}
            name="name"
            label={t("form.name")}
            placeholder={t("form.namePlaceholder")}
          />
        </div>

        <div className="sm:col-span-2">
          <RHFTextArea
            methods={form}
            name="description"
            label={t("form.description")}
            placeholder={t("form.descriptionPlaceholder")}
            rows={3}
          />
        </div>

        <RHFInput
          methods={form}
          name="price"
          label={t("form.price")}
          type="number"
          placeholder={t("form.pricePlaceholder")}
        />

        <RHFSelect
          methods={form}
          name="billing_cycle"
          label={t("form.billingCycle")}
          options={billingOptions}
        />

        <RHFInput
          methods={form}
          name="max_users"
          label={t("form.maxUsers")}
          type="number"
          placeholder={t("form.maxUsersPlaceholder")}
        />

        <RHFInput
          methods={form}
          name="max_branches"
          label={t("form.maxBranches")}
          type="number"
          placeholder={t("form.maxBranchesPlaceholder")}
        />

        <RHFInput
          methods={form}
          name="sort_order"
          label={t("form.sortOrder")}
          type="number"
          placeholder={t("form.sortOrderPlaceholder")}
        />

        <div className="flex flex-col gap-4 sm:col-span-2">
          <RHFSwitch
            methods={form}
            name="is_active"
            label={t("form.isActive")}
          />
          <RHFSwitch
            methods={form}
            name="is_popular"
            label={t("form.isPopular")}
          />
        </div>
      </div>
    </FormContainer>
    </Modal>
  );
}
