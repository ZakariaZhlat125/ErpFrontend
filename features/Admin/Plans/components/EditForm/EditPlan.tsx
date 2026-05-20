"use client";

import { useEffect } from "react";
import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFTextArea } from "@/components/forms/RHFTextArea";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { usePlansForm } from "../../hooks/usePlansForm";
import { BILLING_CYCLE_OPTIONS } from "../../constants/plans.constants";
import { Plan } from "../../types/plans.types";

interface EditPlanProps {
  plan: Plan | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function EditPlan({ plan, isOpen, onClose, onSuccess }: EditPlanProps) {
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = usePlansForm("edit", plan ?? undefined, handleSuccess);

  useEffect(() => {
    if (plan) {
      form.reset({
        name: plan.name,
        description: plan.description,
        price: plan.price,
        billing_cycle: plan.billing_cycle,
        max_users: plan.max_users,
        max_branches: plan.max_branches,
        features: plan.features,
        is_active: plan.is_active,
        is_popular: plan.is_popular,
        sort_order: plan.sort_order,
      });
    }
  }, [plan]);

  const billingOptions = BILLING_CYCLE_OPTIONS.map((o) => ({ value: o.value, label: o.label }));

  const footer = (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        htmlType="submit"
        variant="primary"
        isLoading={isPending}
        disabled={isPending}
        onClick={handleSubmit}
      >
        Save Changes
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Plan"
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
            label="Plan Name"
            placeholder="e.g. Starter Plan"
          />
        </div>

        <div className="sm:col-span-2">
          <RHFTextArea
            methods={form}
            name="description"
            label="Description"
            placeholder="Describe what this plan offers..."
            rows={3}
          />
        </div>

        <RHFInput
          methods={form}
          name="price"
          label="Price ($)"
          type="number"
          placeholder="0.00"
        />

        <RHFSelect
          methods={form}
          name="billing_cycle"
          label="Billing Cycle"
          options={billingOptions}
        />

        <RHFInput
          methods={form}
          name="max_users"
          label="Max Users"
          type="number"
          placeholder="10"
        />

        <RHFInput
          methods={form}
          name="max_branches"
          label="Max Branches"
          type="number"
          placeholder="1"
        />

        <RHFInput
          methods={form}
          name="sort_order"
          label="Sort Order"
          type="number"
          placeholder="0"
        />

        <div className="flex flex-col gap-4 sm:col-span-2">
          <RHFSwitch
            methods={form}
            name="is_active"
            label="Active"
          />
          <RHFSwitch
            methods={form}
            name="is_popular"
            label="Mark as Popular"
          />
        </div>
      </div>
    </FormContainer>
    </Modal>
  );
}
