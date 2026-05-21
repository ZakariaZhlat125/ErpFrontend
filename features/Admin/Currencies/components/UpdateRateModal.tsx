"use client";

import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useExchangeRateForm } from "../hooks/useCurrencyForm";
import { Currency } from "../types/currency.types";
import { useTranslations } from "next-intl";

interface UpdateRateModalProps {
  isOpen: boolean;
  onClose: () => void;
  rateCurrency: Currency | null;
}

export function UpdateRateModal({ isOpen, onClose, rateCurrency: currency }: UpdateRateModalProps) {
  const t = useTranslations("currencies");
  
  const handleSuccess = () => {
    onClose();
  };
  
  const { form, handleSubmit, isPending } = useExchangeRateForm(currency, handleSuccess);

  const footer = (
    <div className="flex justify-end gap-3 pt-2">
      <Button
        htmlType="submit"
        variant="primary"
        isLoading={isPending}
        disabled={isPending}
        onClick={handleSubmit}
      >
        {t("updateRate")}
      </Button>
    </div>
  );

  if (!currency) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("updateRateTitle", { code: currency.code })}
      size="md"
      footer={null}
    >
      <FormContainer
        title=""
        onSubmit={handleSubmit}
        footer={footer}
      >
        <div className="space-y-4">
          <p className="text-sm text-text-muted">
            {t("currentRate")}: <strong>{parseFloat(String(currency.exchange_rate)).toFixed(6)}</strong>
          </p>
          <RHFInput
            methods={form}
            name="exchange_rate"
            label={t("form.newExchangeRate")}
            type="number"
            step="0.000001"
            placeholder={t("form.newExchangeRatePlaceholder")}
          />
        </div>
      </FormContainer>
    </Modal>
  );
}
