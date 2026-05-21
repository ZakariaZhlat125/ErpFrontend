"use client";

import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { RHFSwitch } from "@/components/forms/RHFSwitch";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useCurrencyForm } from "../../hooks/useCurrencyForm";
import { 
  DECIMAL_SEPARATOR_OPTIONS, 
  THOUSANDS_SEPARATOR_OPTIONS, 
  DECIMAL_PLACES_OPTIONS,
  COMMON_CURRENCIES 
} from "../../constants/currency.constants";
import { useTranslations } from "next-intl";

interface CreateCurrencyProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateCurrency({ isOpen, onClose, onSuccess }: CreateCurrencyProps) {
  const t = useTranslations("currencies");
  
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = useCurrencyForm("create", undefined, handleSuccess);

  const currencyCodeOptions = COMMON_CURRENCIES.map((c) => ({ 
    value: c.code, 
    label: `${c.code} - ${c.name}` 
  }));

  const decimalPlacesOptions = DECIMAL_PLACES_OPTIONS.map((o) => ({ 
    value: String(o.value), 
    label: o.label 
  }));

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
      size="lg"
      footer={null}
    >
      <FormContainer
        title=""
        onSubmit={handleSubmit}
        footer={footer}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <RHFSelect
              methods={form}
              name="code"
              label={t("form.code")}
              options={currencyCodeOptions}
              placeholder={t("form.codePlaceholder")}
            />
          </div>

          <div className="sm:col-span-2">
            <RHFInput
              methods={form}
              name="name"
              label={t("form.name")}
              placeholder={t("form.namePlaceholder")}
            />
          </div>

          <RHFInput
            methods={form}
            name="symbol"
            label={t("form.symbol")}
            placeholder={t("form.symbolPlaceholder")}
          />

          <RHFInput
            methods={form}
            name="exchange_rate"
            label={t("form.exchangeRate")}
            type="number"
            step="0.000001"
            placeholder={t("form.exchangeRatePlaceholder")}
          />

          <RHFSelect
            methods={form}
            name="decimal_separator"
            label={t("form.decimalSeparator")}
            options={DECIMAL_SEPARATOR_OPTIONS}
          />

          <RHFSelect
            methods={form}
            name="thousands_separator"
            label={t("form.thousandsSeparator")}
            options={THOUSANDS_SEPARATOR_OPTIONS}
          />

          <RHFSelect
            methods={form}
            name="decimal_places"
            label={t("form.decimalPlaces")}
            options={decimalPlacesOptions}
          />

          <div className="flex items-center h-full pt-6">
            <RHFSwitch
              methods={form}
              name="is_active"
              label={t("form.isActive")}
            />
          </div>
        </div>
      </FormContainer>
    </Modal>
  );
}
