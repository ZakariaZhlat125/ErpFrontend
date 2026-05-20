"use client";

import { FormContainer } from "@/components/forms/FormContainer";
import { RHFInput } from "@/components/forms/RHFInput";
import { RHFSelect } from "@/components/forms/RHFSelect";
import { Button } from "@/components/ui";
import { Modal } from "@/components/ui/Modal";
import { useUsersForm } from "../../hooks/useUsersForm";
import { USER_ROLE_OPTIONS, USER_STATUS_OPTIONS } from "../../constants/users.constants";
import { useTranslations } from "next-intl";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateUser({ isOpen, onClose, onSuccess }: CreateUserProps) {
  const t = useTranslations("users");
  
  const handleSuccess = () => {
    onSuccess?.();
    onClose();
  };
  const { form, handleSubmit, isPending } = useUsersForm("create", undefined, handleSuccess);

  const roleOptions = USER_ROLE_OPTIONS.map((o) => ({ value: o.value, label: t(`roles.${o.value}`) }));
  const statusOptions = USER_STATUS_OPTIONS.map((o) => ({ value: o.value, label: t(`status.${o.value}`) }));

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          name="email"
          label={t("form.email")}
          type="email"
          placeholder={t("form.emailPlaceholder")}
        />

        <RHFInput
          methods={form}
          name="phone"
          label={t("form.phone")}
          placeholder={t("form.phonePlaceholder")}
        />

        <RHFInput
          methods={form}
          name="password"
          label={t("form.password")}
          type="password"
          placeholder={t("form.passwordPlaceholder")}
        />

        <RHFInput
          methods={form}
          name="password_confirmation"
          label={t("form.passwordConfirmation")}
          type="password"
          placeholder={t("form.passwordConfirmationPlaceholder")}
        />

        <RHFSelect
          methods={form}
          name="role"
          label={t("form.role")}
          options={roleOptions}
        />

        <RHFSelect
          methods={form}
          name="status"
          label={t("form.status")}
          options={statusOptions}
        />
      </div>
    </FormContainer>
    </Modal>
  );
}
